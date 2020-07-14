using System.Collections.Generic;
using System.Linq;
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

		public static SolutionInfo CreateSolutionInfo (CodeExecutionRequest request)
		{
			List<string> stdinFilenames = new List<string> ();
			for (int i = 0; i < request.TestCases.Count; i++)
			{
				stdinFilenames.Add ($"in-{Helpers.RandomId(8)}");
			}

			return new SolutionInfo ()
			{
				SolutionName = $"sol-{Helpers.RandomId(32)}",
					StandardInputDirectory = $"stdin-{Helpers.RandomId(8)}",
					StandardInputFilenames = stdinFilenames,
					ProgramFilename = "main.cpp",
					ProgramName = "main",
					SourceCode = request.SourceCode,
					SampleInputs = request.TestCases.Select (r => r.SampleInput).ToList ()
			};
		}
	}
}
