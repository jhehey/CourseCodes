using System.Collections.Generic;

namespace CourseCodesAPI.Services.CodeExecutionService.Models
{
	public class SolutionInfo
	{
		public string SolutionName { get; set; }
		public string StandardInputDirectory { get; set; }
		public List<string> StandardInputFilenames { get; set; }
		public string ProgramFilename { get; set; }
		public string ProgramName { get; set; }

	}
}
