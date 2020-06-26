using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;

namespace CourseCodesAPI.Services.RemoteCodeExecution
{
	public class SourceCodeService : ISourceCodeService
	{
		// /tmp/data
		public string SourceCodeDirectory { get; }

		// C:/.../tmp/data
		public string FullSourceCodeDirectory { get; }

		public SourceCodeService ()
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

		public async Task<SourceCodeInfo> SaveSourceCode (string sourceCode, string baseDirectory, string extension = "cpp")
		{
			// /tmp/data/{solutionName}/
			string solutionName = Helpers.RandomId (32);

			// C:/.../tmp/data/{solutionName}/
			string fullSolutionName = Path.Join (baseDirectory, solutionName);

			string programName = "main";

			// main.cpp
			string filename = $"{programName}.{extension}";

			// C:/.../tmp/data/{solutionName}/{filename}
			string fullFilename = Path.Join (fullSolutionName, filename);

			string runScript = Path.Join (fullSolutionName, "run.sh");

			try
			{
				// create a directory
				if (Directory.Exists (fullSolutionName))
				{
					throw new Exception ("Directory already exist");
				}
				DirectoryInfo directoryInfo = Directory.CreateDirectory (fullSolutionName);

				// write to file called main.cpp
				using (StreamWriter streamWriter = new StreamWriter (fullFilename))
				{
					await streamWriter.WriteAsync (sourceCode);
				}

				// return the absolute path TODO: just return {randomDirectory}/{filename}
				if (!File.Exists (fullFilename))
				{
					throw new Exception ("Source code file doesn't exist");
				}

				// return sourceCodeInfo
				SourceCodeInfo sourceCodeInfo = new SourceCodeInfo ()
				{
					SolutionName = solutionName,
						FullSolutionName = fullSolutionName,
						ProgramName = programName,
						Filename = filename,
						FullFilename = fullFilename
				};
				return sourceCodeInfo;
			}
			catch (Exception e)
			{
				Console.WriteLine ($"There was a problem in saving the source code {e.ToString()}", nameof (SaveSourceCode));
				throw;
			}
		}
	}

	public class SourceCodeInfo
	{
		public string SolutionName { get; set; }
		public string FullSolutionName { get; set; }
		public string ProgramName { get; set; }
		public string Filename { get; set; }
		public string FullFilename { get; set; }
	}
}
