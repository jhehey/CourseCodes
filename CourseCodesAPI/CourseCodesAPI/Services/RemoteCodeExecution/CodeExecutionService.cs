using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CourseCodesAPI.Services.RemoteCodeExecution
{
	public class CodeExecutionService : ICodeExecutionService
	{
		public Queue<string> problemTasks { get; set; }
		public Stack<ContainerRunner> availableRunners { get; set; }
		public List<ContainerRunner> busyRunners { get; set; }
		public List<Task> RunningTasks { get; set; }
		public int MaxContainerRunners = 5;
		private readonly ISourceCodeService _sourceCodeService;

		public CodeExecutionService (ISourceCodeService sourceCodeService)
		{
			problemTasks = new Queue<string> ();
			availableRunners = new Stack<ContainerRunner> ();
			busyRunners = new List<ContainerRunner> ();
			RunningTasks = new List<Task> ();
			_sourceCodeService = sourceCodeService ??
				throw new ArgumentNullException (nameof (sourceCodeService));
		}

		public async Task StartupContainerRunners ()
		{
			// start containers
			Console.WriteLine ("CodeExecutionService: StartupContainerRunners");
			var tasks = new List<Task> ();

			for (int i = 0; i < MaxContainerRunners; i++)
			{
				ContainerRunner containerRunner = ContainerRunnerFactory.CreateCppRunner ();

				// create source code directory for the container to mount a volume
				var directoryInfo = _sourceCodeService.CreateSubdirectory (containerRunner.ContainerName);
				containerRunner.SourceCodesDirectory = directoryInfo.FullName;

				// store the reference and run its startup function
				availableRunners.Push (containerRunner);
				Console.WriteLine ($"{i + 1}) Startup");
				tasks.Add (containerRunner.Startup ());
			}

			await Task.WhenAll (tasks).ConfigureAwait (false);
		}

		public async Task StopContainerRunners ()
		{
			// Cancel all busy
			while (busyRunners.Count > 0)
			{
				int index = busyRunners.Count - 1;
				var busyRunner = busyRunners[index];
				Console.WriteLine ($"Cancel BusyRunner: {busyRunner.ContainerName}");
				busyRunners.RemoveAt (index);
				availableRunners.Push (busyRunner);
			}
			// get all container names from available containers
			string containerNames = String.Join (" ", availableRunners.Select (x => x.ContainerName));

			// stop
			Console.WriteLine ("Stopping Container Runners...");
			var result = await ContainerRunner.Stop (containerNames);
			Console.WriteLine (result);
		}

		public async Task<string> CompileAndRun (string sourceCode)
		{
			if (availableRunners.Count <= 0)
			{
				Console.WriteLine ("There are no available container runners to execute, please wait");
				return null;
			}

			// get available runner first
			var containerRunner = availableRunners.Pop ();
			busyRunners.Add (containerRunner);

			// save the code inside the container's source code directory
			var sourceCodeInfo = await _sourceCodeService.SaveSourceCode (sourceCode, containerRunner.SourceCodesDirectory);

			// execute and get the result
			var result = await containerRunner.Execute (sourceCodeInfo);

			// runner finished executing, its available again
			busyRunners.Remove (containerRunner);
			availableRunners.Push (containerRunner);

			return result;
		}
	}
}
