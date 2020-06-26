using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CliWrap;
using CliWrap.Buffered;
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

			BufferedCommandResult result = await Cli.Wrap (ContainerConfiguration.DefaultShell)
				.WithArguments (command)
				.ExecuteBufferedAsync ();

			return result;
		}

		public async Task<BufferedCommandResult> CompileAsync (SolutionInfo solutionInfo)
		{
			string compileCommand = CppCommands.Compile (solutionInfo);
			string command = DockerCommands.Exec (this, compileCommand);

			BufferedCommandResult result = await Cli.Wrap (ContainerConfiguration.DefaultShell)
				.WithArguments (command)
				.ExecuteBufferedAsync ();

			return result;
		}

		public async Task<BufferedCommandResult> RunAsync (SolutionInfo solutionInfo, int selectedInput)
		{
			if (selectedInput < 0 || selectedInput > solutionInfo.StandardInputFilenames.Count)
			{
				throw new ArgumentOutOfRangeException (nameof (selectedInput));
			}

			string runCommand = CppCommands.Run (solutionInfo, selectedInput);
			string command = DockerCommands.Exec (this, runCommand);

			BufferedCommandResult result = await Cli.Wrap (ContainerConfiguration.DefaultShell)
				.WithArguments (command)
				.ExecuteBufferedAsync ();

			return result;
		}

		public static async Task<BufferedCommandResult> Stop (List<string> containerNames)
		{
			string containers = String.Join (" ", containerNames);
			string command = DockerCommands.Stop (containers);

			BufferedCommandResult result = await Cli.Wrap (ContainerConfiguration.DefaultShell)
				.WithArguments (command)
				.ExecuteBufferedAsync ();

			return result;
		}

	}
}
