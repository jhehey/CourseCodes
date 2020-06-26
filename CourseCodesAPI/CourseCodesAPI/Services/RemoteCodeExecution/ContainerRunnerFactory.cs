using System.IO;
namespace CourseCodesAPI.Services.RemoteCodeExecution
{
	public class ContainerRunnerFactory
	{
		public static ContainerRunner CreateCppRunner ()
		{
			return new ContainerRunner ()
			{
				ContainerName = $"cpprunner-{Helpers.RandomId()}",
					ImageName = "coursecodes/cpprunner"
			};
		}
	}
}
