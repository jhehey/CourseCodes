namespace CourseCodesAPI.Services.CodeExecutionService.Commands
{
	public static class DockerCommands
	{
		public static string Run (ContainerRunner containerRunner)
		{
			return "docker run --rm -t -d " +
				$"-v '{containerRunner.MountedDirectory}:{containerRunner.WorkingDirectory}' " +
				$"--name '{containerRunner.ContainerName}' " +
				$"'{containerRunner.ImageName}' " +
				"/bin/sh";
		}

		public static string Exec (ContainerRunner containerRunner, string command)
		{
			return $"\"docker exec " +
				$"-w '{containerRunner.WorkingDirectory}' " +
				$"-t '{containerRunner.ContainerName}' " +
				$"/bin/sh -c '{command}'\"";
		}

		public static string Stop (string containers)
		{
			return $"docker stop {containers}";
		}
	}
}
