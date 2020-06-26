using System;
using System.IO;

namespace CourseCodesAPI.Services.RemoteCodeExecution
{
	public class ContainerFileService
	{
		// /tmp/data
		public string SourceCodeDirectory { get; }
		// C:/.../tmp/data
		public string FullSourceCodeDirectory { get; }

		public ContainerFileService ()
		{
			SourceCodeDirectory = Environment.GetEnvironmentVariable ("SOURCECODE_DIRECTORY");
			FullSourceCodeDirectory = Path.GetFullPath (SourceCodeDirectory);
			Directory.CreateDirectory (FullSourceCodeDirectory);
			Console.WriteLine ("SOURCE CODE DIRECTORY " + FullSourceCodeDirectory);
		}

		public DirectoryInfo CreateSubdirectory (string directory)
		{
			string subdirectory = Path.Join (FullSourceCodeDirectory, directory);
			if (Directory.Exists (subdirectory))
			{
				throw new ArgumentException ("Directory already exists", nameof (subdirectory));
			}
			return Directory.CreateDirectory (subdirectory);
		}

	}
}
