using System;
using System.Collections.Generic;

namespace CourseCodesAPI.Services.RemoteCodeExecution
{
	public class DockerRunArgs
	{
		public string ContainerName { get; set; }
		public string ImageName { get; set; }
		public string SourceCodesDirectory { get; set; }
	}

	public class DockerStopArgs
	{
		public string ContainerNames { get; set; }
	}

	public class DockerCopyArgs
	{
		public string Source { get; set; }
		public string Destination { get; set; }
		public string ContainerName { get; set; }
	}

	public class DockerExecuteCppArgs
	{
		public string SourceCodesDirectory { get; set; }
		public string ContainerName { get; set; }
		public string SolutionName { get; set; }
		public string Filename { get; set; }
		public string ProgramName { get; set; }
	}

	public class DockerCleanUpArgs
	{
		public string WorkingDirectory { get; set; }
		public string ContainerName { get; set; }
		public string SolutionName { get; set; }
	}

	public class DockerCommandBuilder
	{
		private List<string> commands { get; set; } = new List<string> ();

		public DockerCommandBuilder Run (DockerRunArgs args)
		{
			string command = $"run --rm -it -d -v \"{args.SourceCodesDirectory}\":/tmp/data --name \"{args.ContainerName}\" \"{args.ImageName}\" /bin/sh";
			commands.Add (command);
			return this;
		}

		public DockerCommandBuilder ExecuteCpp (DockerExecuteCppArgs args)
		{
			// TODO: Get input and redirect to stdin?
			string command = $@"exec -t {
				args.ContainerName
				} /bin/sh -c ""cd '{args.SourceCodesDirectory}/{args.SolutionName}' && g++ --static './{
					args.Filename
					}' -o '{args.ProgramName}' && './{args.ProgramName}'""";

			commands.Add (command);
			return this;
		}

		public DockerCommandBuilder Stop (DockerStopArgs args)
		{
			string command = $"stop {args.ContainerNames}";
			commands.Add (command);
			return this;
		}

		public DockerCommandBuilder Copy (DockerCopyArgs args)
		{
			string command = $"docker cp \"{args.Source}/.\" {args.ContainerName}:\"{args.Destination}\"";
			commands.Add (command);
			return this;
		}

		public DockerCommandBuilder CleanUp (DockerCleanUpArgs args)
		{
			string command = $@"docker exec -w=""{args.WorkingDirectory}"" {
				args.ContainerName
				} /bin/sh -c ""[ -d ""./{args.SolutionName}"" ] && rm -rf ""./{args.SolutionName}""""";

			commands.Add (command);
			return this;
		}

		public DockerCommandBuilder Images ()
		{
			string command = "docker images";
			commands.Add (command);
			return this;
		}

		public DockerCommandBuilder Version ()
		{
			string command = "docker --version";
			commands.Add (command);
			return this;
		}

		public DockerCommandBuilder ListContainers ()
		{
			string command = "docker container ls";
			commands.Add (command);
			return this;
		}

		public string Build (bool isQuoted = false)
		{
			var command = String.Join ("; ", commands);
			return isQuoted ? $"\"{command}\"" : command;
		}
	}
}
