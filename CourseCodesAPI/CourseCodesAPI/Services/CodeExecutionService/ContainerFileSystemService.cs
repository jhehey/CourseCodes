using System;
using System.IO;
using System.Threading.Tasks;
namespace CourseCodesAPI.Services.CodeExecutionService
{
	public interface IContainerFileSystemService
	{
		DirectoryInfo CreateDirectory (string directory);
		bool CreateSolutionDirectory (string containerName, string solutionName);

		Task WriteFileAsync (string filename, string content);

	}

	public class ContainerFileSystemService : IContainerFileSystemService
	{
		public DirectoryInfo CreateDirectory (string directory)
		{
			if (Directory.Exists (directory))
			{
				Console.WriteLine ($"{nameof(ContainerFileSystemService)}: Directory already exists");
				return null;
			}

			return Directory.CreateDirectory (directory);
		}

		public bool CreateSolutionDirectory (string containerName, string solutionName)
		{
			// {WorkingDirectory}/{ContainerName}/{SolutionName}
			// {/tmp/data}{/containerName}{/solutionName}
			string directory = Path.Join (ContainerConfiguration.BaseContainerMountedDirectory, containerName, solutionName);
			if (Directory.Exists (directory))
			{
				Console.WriteLine ($"{nameof(CreateSolutionDirectory)}: Directory already exists");
				return false;
			}

			Directory.CreateDirectory (directory);
			return true;
		}

		public async Task WriteFileAsync (string filename, string content)
		{
			try
			{
				using (StreamWriter streamWriter = new StreamWriter (filename))
				{
					await streamWriter.WriteAsync (content);
				}
			}
			catch (Exception)
			{
				Console.WriteLine ($"{nameof(WriteFileAsync)}: There was a problem writing to file");
			}
		}
	}
}
