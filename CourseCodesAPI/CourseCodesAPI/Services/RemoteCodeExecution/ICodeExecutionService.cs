using System.Collections.Generic;
using System.Threading.Tasks;
using CourseCodesAPI.Models;

namespace CourseCodesAPI.Services.RemoteCodeExecution
{
	public interface ICodeExecutionService
	{
		Task StartupContainerRunners ();
		Task StopContainerRunners ();
		Task<string> CompileAndRun (string sourceCode);
		Task<List<ExecutionResultDto>> CompileAndRun (ProblemSolutionForExecutionDto problemSolution);
	}
}
