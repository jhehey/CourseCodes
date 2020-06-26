using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
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

		public int MaxContainers { get; } = 1;
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
			var startTasks = new List<Task> ();

			for (int i = 0; i < MaxContainers; i++)
			{
				// create instance and add to available containers
				ContainerRunner containerRunner = ContainerRunnersFactory.CreateCppRunner ();
				AvailableContainers.Push (containerRunner);

				// create directory for each ContainerRunner to isolate their files
				_containerFileSystem.CreateDirectory (containerRunner.MountedDirectory);

				// initialize container runner
				Console.WriteLine ($"{nameof(CodeExecutionService)}: {containerRunner.ContainerName} starting...");
				startTasks.Add (containerRunner.StartAsync ());
			}

			// Finish this task only when all containerRunners have started up
			await Task.WhenAll (startTasks).ConfigureAwait (false);
			Console.WriteLine ($"{nameof(CodeExecutionService)}: Containers started...");
		}

		public async Task<CodeExecutionResult> ExecuteAsync (CodeExecutionRequest request)
		{
			if (AvailableContainers.Count <= 0)
			{
				Console.WriteLine ("There are no available contianer runners, try again later");
				return null;
			}

			// get available ContainerRunner
			var containerRunner = AvailableContainers.Pop ();
			BusyContainers.Add (containerRunner);

			// get a new SolutionInfo
			var solutionInfo = SolutionInfoFactory.CreateSolutionInfo (InputCount: request.TestCases.Count);

			// create solution directory
			var solutionDirectory = Path.Join (containerRunner.MountedDirectory, solutionInfo.SolutionName);
			_containerFileSystem.CreateDirectory (solutionDirectory);

			// create stdin directory
			var stdinDirectory = Path.Join (solutionDirectory, solutionInfo.StandardInputDirectory);
			_containerFileSystem.CreateDirectory (stdinDirectory);

			// write the source code
			var fullProgramFilename = Path.Join (solutionDirectory, solutionInfo.ProgramFilename);
			await _containerFileSystem.WriteFileAsync (fullProgramFilename, request.SourceCode);

			// compile the program
			var compileResult = await containerRunner.CompileAsync (solutionInfo);
			if (compileResult.ExitCode != 0)
			{
				Console.WriteLine (compileResult.StandardError);
				Console.WriteLine (compileResult.StandardOutput);
				return null;
			}

			// foreach(sample input)
			List<TestCaseResult> testResults = new List<TestCaseResult> ();
			for (int i = 0; i < request.TestCases.Count; i++)
			{
				// get the test case
				var testCase = request.TestCases[i];

				// initialize TestResult
				var testResult = new TestCaseResult ()
				{
					SampleInput = testCase.SampleInput,
						ExpectedOutput = testCase.ExpectedOutput,
						Status = TestCaseStatus.Testing
				};
				testResults.Add (testResult);

				// write sample input to file to stdin directory
				var stdinFilename = solutionInfo.StandardInputFilenames[i];
				var fullStdinFilename = Path.Join (stdinDirectory, stdinFilename);
				await _containerFileSystem.WriteFileAsync (fullStdinFilename, testCase.SampleInput);

				// execute given sample input
				var runResult = await containerRunner.RunAsync (solutionInfo, i);

				if (runResult.ExitCode == 0)
				{
					// program ran successfully
					testResult.ActualOutput = runResult.StandardOutput.Trim ();

					// check the outputs if it passed
					// TODO: Convert yung mga Newline to same format
					if (testResult.ExpectedOutput.Equals (testResult.ActualOutput))
					{
						testResult.Status = TestCaseStatus.Passed;
					}
					else
					{
						testResult.Status = TestCaseStatus.Failed;
					}
				}
				else
				{
					testResult.Status = TestCaseStatus.Error;
					testResult.ErrorMessage = runResult.StandardError;
				}
			}
			// TODO: Execute these in parallel

			// containerRunner finished
			BusyContainers.Remove (containerRunner);
			AvailableContainers.Push (containerRunner);

			// Cleanup - just delete the whole solution directory recursively

			// return code execution result
			return new CodeExecutionResult ()
			{
				TestCaseResults = testResults
			};

		}

	}
}
