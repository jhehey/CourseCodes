using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using CliWrap;
using CliWrap.Buffered;
using CourseCodesAPI.Services.CodeExecutionService;
using CourseCodesAPI.Services.CodeExecutionService.Commands;
using CourseCodesAPI.Services.CodeExecutionService.Models;

namespace CourseCodesAPI.Services.CodeExecutionService
{
	public class ContainerRunner
	{
		public string ContainerName { get; set; }
		public string ImageName { get; set; }
		public string MountedDirectory { get; set; }
		public string WorkingDirectory { get; set; }

		public async Task<BufferedCommandResult> StartAsync ()
		{
			string command = DockerCommands.Run (this);
			Console.WriteLine (command);

			BufferedCommandResult result = await Cli.Wrap (ContainerConfiguration.DefaultShell)
				.WithArguments (command)
				.ExecuteBufferedAsync ();

			return result;
		}

		public async Task<BufferedCommandResult> RunAsync (SolutionInfo solutionInfo)
		{
			string runCommand = CppCommands.Run (solutionInfo);
			string command = DockerCommands.Exec (this, runCommand);
			Console.WriteLine (command);

			using var cts = new CancellationTokenSource ();
			cts.CancelAfter (TimeSpan.FromSeconds (ContainerConfiguration.ProcessTimeoutSeconds));

			BufferedCommandResult result = await Cli.Wrap (ContainerConfiguration.DefaultShell)
				.WithArguments (command)
				.WithValidation (CommandResultValidation.None)
				.ExecuteBufferedAsync (cts.Token); // cts

			// throws OperationCanceledException

			return result;
		}

		public static async Task<BufferedCommandResult> Stop (List<string> containerNames)
		{
			string containers = String.Join (" ", containerNames);
			string command = DockerCommands.Stop (containers);
			Console.WriteLine (command);

			BufferedCommandResult result = await Cli.Wrap (ContainerConfiguration.DefaultShell)
				.WithArguments (command)
				.ExecuteBufferedAsync ();

			return result;
		}

	}
}
