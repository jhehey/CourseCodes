using System;
using System.IO;
using System.Threading.Tasks;
using CliWrap;
using CliWrap.Buffered;

namespace CourseCodesAPI.Services.RemoteCodeExecution
{
	public enum ContainerState
	{
		Null = 0,
		Available,
		Busy,
		Down
	}

	public class ContainerRunnerResultEventArgs : EventArgs
	{
		public BufferedCommandResult Result { get; set; }
	}

	public class ContainerRunner
	{
		public string ContainerName { get; set; }
		public string ImageName { get; set; }
		public string SourceCodesDirectory { get; set; }

		public async Task<BufferedCommandResult> Startup ()
		{
			string command = new DockerCommandBuilder ()
				.Run (new DockerRunArgs ()
				{
					ContainerName = ContainerName,
						ImageName = ImageName,
						SourceCodesDirectory = SourceCodesDirectory
				}).Build ();

			// TODO: Catch errors when running async processes
			var result = await Cli.Wrap ("docker")
				.WithArguments (command)
				.ExecuteBufferedAsync ();

			Console.WriteLine ($"Container: {ContainerName} started...");

			return result;
		}

		public async Task<string> Test (string problemTask)
		{
			Console.WriteLine ("Testing: " + problemTask);

			string command = new DockerCommandBuilder ().Version ().Images ().ListContainers ().Build (true);

			var result = await Cli.Wrap ("powershell")
				.WithArguments (command)
				.ExecuteBufferedAsync ();

			return result.StandardOutput;
		}

		public async Task<string> Execute (SourceCodeInfo sourceCodeInfo)
		{
			string command = new DockerCommandBuilder ()
				.ExecuteCpp (new DockerExecuteCppArgs ()
				{
					ContainerName = ContainerName,
						SourceCodesDirectory = "/tmp/data",
						SolutionName = $"{sourceCodeInfo.SolutionName}",
						Filename = sourceCodeInfo.Filename,
						ProgramName = sourceCodeInfo.ProgramName
				})
				.Build ();

			var result = await Cli.Wrap ("docker")
				.WithArguments (command)
				.ExecuteBufferedAsync ();

			Console.WriteLine ("result.StandardError");
			Console.WriteLine (result.StandardError);
			Console.WriteLine ("result.StandardOutput");
			Console.WriteLine (result.StandardOutput);

			return result.StandardOutput;
		}

		public static async Task<string> Stop (string containerNames)
		{
			string command = new DockerCommandBuilder ()
				.Stop (new DockerStopArgs ()
				{
					ContainerNames = containerNames
				}).Build ();

			var result = await Cli.Wrap ("docker")
				.WithArguments (command)
				.ExecuteBufferedAsync ();

			return result.StandardOutput;
		}
	}
}
