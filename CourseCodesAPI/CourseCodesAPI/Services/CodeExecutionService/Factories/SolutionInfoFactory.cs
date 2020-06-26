using System.Collections.Generic;
using CourseCodesAPI.Services.CodeExecutionService.Models;

namespace CourseCodesAPI.Services.CodeExecutionService.Factories
{
	public static class SolutionInfoFactory
	{
		public static SolutionInfo CreateSolutionInfo (int InputCount)
		{
			List<string> stdinFilenames = new List<string> ();
			for (int i = 0; i < InputCount; i++)
			{
				stdinFilenames.Add ($"in-{Helpers.RandomId(8)}");
			}

			return new SolutionInfo ()
			{
				SolutionName = $"sol-{Helpers.RandomId(32)}",
					StandardInputDirectory = $"stdin-{Helpers.RandomId(8)}",
					StandardInputFilenames = stdinFilenames,
					ProgramFilename = "main.cpp",
					ProgramName = "main"
			};
		}
	}
}
