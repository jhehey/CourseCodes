using System;
using System.Linq;
using System.Text.RegularExpressions;
using CourseCodesAPI.Helpers;
using CourseCodesAPI.Services.CodeExecutionService.Models;

namespace CourseCodesAPI.Services.CodeExecutionService.Commands
{
	public static class CppCommands
	{
		public static string Run (SolutionInfo solutionInfo)
		{
			return $"mkdir {solutionInfo.SolutionName} && cd {solutionInfo.SolutionName} && " + // Create solution directory
				$"echo \'{solutionInfo.SourceCode.ToBase64String()}\' | base64 -d > {solutionInfo.ProgramFilename} && " + // Write source code
				$"g++ --static {solutionInfo.ProgramFilename} -o {solutionInfo.ProgramName}; STATUS=$?; if [[ $STATUS == 0 ]]; then " + // compile
				$"for sampleInput in {String.Join(" ", solutionInfo.SampleInputs.Select(x => x.ToBase64String()))};" + // for each sample input
				"do echo \\`$sampleInput\\` | base64 -d | " + // redirect stdin
				$"./{solutionInfo.ProgramName} | base64; " + // run program and encode output
				$"done; fi; rm -rf ../{solutionInfo.SolutionName}; exit $STATUS"; // cleanup
		}
	}
}
