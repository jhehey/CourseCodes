using System;
using CourseCodesAPI.Services.CodeExecutionService.Models;

namespace CourseCodesAPI.Services.CodeExecutionService.Commands
{
	public static class CppCommands
	{
		public static string Compile (SolutionInfo solutionInfo)
		{
			return $"cd {solutionInfo.SolutionName} && " +
				$"g++ --static {solutionInfo.ProgramFilename} -o {solutionInfo.ProgramName}";
		}

		public static string Run (SolutionInfo solutionInfo, int selectedInput)
		{
			return $"cd {solutionInfo.SolutionName} && " +
				$"cat ./{solutionInfo.StandardInputDirectory}/{solutionInfo.StandardInputFilenames[selectedInput]} | " +
				$"./{solutionInfo.ProgramName}";
		}
	}
}
