using System.Threading.Tasks;

namespace CourseCodesAPI.Services.RemoteCodeExecution
{
	public interface ICodeExecutionService
	{
		Task StartupContainerRunners ();
		Task StopContainerRunners ();
		Task<string> CompileAndRun (string sourceCode);
	}
}
