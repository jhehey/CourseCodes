using System;
using System.IO;

namespace CourseCodesAPI.Services.CodeExecutionService
{
	public static class ContainerConfiguration
	{
		public static string BaseContainerMountedDirectory { get; } // C:/.../tmp/data (windows)
		public static string BaseContainerWorkingDirectory { get; } // /tmp/data (linux)
		public static string DefaultShell { get; } = "docker"; //"powershell";

		static ContainerConfiguration ()
		{
			// each container will have its working directory in /tmp/data
			// each container's /tmp/data is mounted to C:/.../tmp/data/{containerName}

			var relativeMountedDirectory = Environment.GetEnvironmentVariable ("BASE_CONTAINERMOUNTED_DIRECTORY");
			if (relativeMountedDirectory == null) throw new ArgumentNullException (nameof (relativeMountedDirectory));
			BaseContainerMountedDirectory = Path.GetFullPath (relativeMountedDirectory);
			Console.WriteLine ($"BaseContainerMountedDirectory: {BaseContainerMountedDirectory}");

			BaseContainerWorkingDirectory = Environment.GetEnvironmentVariable ("BASE_CONTAINERWORKING_DIRECTORY");
			if (BaseContainerWorkingDirectory == null) throw new ArgumentNullException (nameof (BaseContainerWorkingDirectory));
		}
	}
}
