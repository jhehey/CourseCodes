using System.IO;

namespace CourseCodesAPI.Services.CodeExecutionService.Factories
{
	public static class ContainerRunnersFactory
	{
		public static ContainerRunner CreateCppRunner ()
		{
			string containerName = $"cpp-{Helpers.RandomId(16)}";

			// TODO: Path.Join
			return new ContainerRunner ()
			{
				ContainerName = containerName,
					ImageName = "coursecodes/cpprunner",
					MountedDirectory = Path.Join (ContainerConfiguration.BaseContainerMountedDirectory, containerName),
					WorkingDirectory = Path.Join (ContainerConfiguration.BaseContainerWorkingDirectory, containerName)
			};
		}
	}
}
