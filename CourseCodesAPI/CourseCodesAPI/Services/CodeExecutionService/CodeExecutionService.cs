using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CourseCodesAPI.Helpers;
using CourseCodesAPI.Services.CodeExecutionService.Factories;
using CourseCodesAPI.Services.CodeExecutionService.Models;

namespace CourseCodesAPI.Services.CodeExecutionService
{
	public interface ICodeExecutionService
	{
		Task StartContainerRunnersAsync ();
		Task<CodeExecutionResult> ExecuteAsync (CodeExecutionRequest request);
	}

	public class CodeExecutionService : ICodeExecutionService
	{
		private readonly IContainerFileSystemService _containerFileSystem;

		public int MaxContainers { get; } = 20;
		public List<ContainerRunner> BusyContainers { get; } = new List<ContainerRunner> ();
		public Stack<ContainerRunner> AvailableContainers { get; } = new Stack<ContainerRunner> ();

		public CodeExecutionService (IContainerFileSystemService containerFileSystem)
		{
			_containerFileSystem = containerFileSystem ??
				throw new System.ArgumentNullException (nameof (containerFileSystem));
		}

		public async Task StartContainerRunnersAsync ()
		{
			Console.WriteLine ($"{nameof(CodeExecutionService)}: {nameof(StartContainerRunnersAsync)}");

			for (int i = 0; i < MaxContainers; i++)
			{
				// create instance and add to available containers
				ContainerRunner containerRunner = ContainerRunnersFactory.CreateCppRunner ();
				AvailableContainers.Push (containerRunner);

				// create directory for each ContainerRunner to isolate their files
				_containerFileSystem.CreateDirectory (containerRunner.MountedDirectory);

				// initialize container runner
				Console.WriteLine ($"{nameof(CodeExecutionService)}: {containerRunner.ContainerName} starting...");
				await containerRunner.StartAsync ();
				Console.WriteLine ($"{nameof(CodeExecutionService)}: {containerRunner.ContainerName} started...");
			}

			// Finish this task only when all containerRunners have started up
			Console.WriteLine ($"{nameof(CodeExecutionService)}: Containers started...");
		}

		public async Task<CodeExecutionResult> ExecuteAsync (CodeExecutionRequest request)
		{
			// TODO: Just spawn extra containers?
			if (AvailableContainers.Count <= 0)
			{
				Console.WriteLine ("There are no available contianer runners, try again later");
				return null;
			}

			// get a new SolutionInfo
			var solutionInfo = SolutionInfoFactory.CreateSolutionInfo (request);
			List<TestCaseResult> testResults = new List<TestCaseResult> ();

			// get available ContainerRunner
			var containerRunner = AvailableContainers.Pop ();
			BusyContainers.Add (containerRunner);
			try
			{

				// run
				var runResult = await containerRunner.RunAsync (solutionInfo);

				Console.WriteLine ("Exit Code");
				Console.WriteLine (runResult.ExitCode);
				Console.WriteLine ("StandardOutput");
				Console.WriteLine (runResult.StandardOutput);
				Console.WriteLine ("StandardError");
				Console.WriteLine (runResult.StandardError);

				if (runResult.ExitCode != 0)
				{
					Console.WriteLine ("HINDI ZERO EXIT CODE");
					return new CodeExecutionResult ()
					{
						SolutionId = request.SolutionId,
							Passed = false,
							CompilationError = runResult.StandardOutput
					};
				}

				var outputs = runResult.StandardOutput.Split (":")
					.Select (x => Regex.Replace (x, @"\t|\n|\r", "").FromBase64ToString ().Trim ()).ToList ();

				for (int i = 0; i < request.TestCases.Count; i++)
				{
					var testCase = request.TestCases[i];

					var testResult = new TestCaseResult ()
					{
						SampleInput = testCase.SampleInput,
							ExpectedOutput = testCase.ExpectedOutput,
							ActualOutput = outputs[i],
							Status = testCase.ExpectedOutput.Equals (outputs[i]) ?
							TestCaseStatus.Passed : TestCaseStatus.Failed
					};
					testResults.Add (testResult);
				}
			}
			catch (Exception e)
			{
				Console.WriteLine ("MAY EXCEPTION TANGINA");
				Console.WriteLine (e.Message);
			}
			finally
			{
				BusyContainers.Remove (containerRunner);
				AvailableContainers.Push (containerRunner);
			}

			bool passed = testResults.Count > 0 && testResults.All (t => t.Status == TestCaseStatus.Passed);
			return new CodeExecutionResult ()
			{
				SolutionId = request.SolutionId,
					TestCaseResults = testResults,
					Passed = passed
			};
		}
	}
}
