using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CourseCodesAPI.Contexts;
using CourseCodesAPI.Helpers;
using CourseCodesAPI.Models;
using CourseCodesAPI.Services.CodeExecutionService;
using CourseCodesAPI.Services.CodeExecutionService.Models;
using Microsoft.AspNetCore.Mvc;

namespace CourseCodesAPI.Controllers
{
	[ApiController]
	[Route ("api/coderunners")]
	public class CodeRunnersController : ControllerBase
	{
		private readonly CourseCodesContext _context;
		private readonly IMapper _mapper;
		private readonly ICodeExecutionService _codeExecutionService;

		public CodeRunnersController (CourseCodesContext context, IMapper mapper, ICodeExecutionService codeExecutionService)
		{
			_context = context ??
				throw new System.ArgumentNullException (nameof (context));
			_mapper = mapper ??
				throw new System.ArgumentNullException (nameof (mapper));
			_codeExecutionService = codeExecutionService ??
				throw new System.ArgumentNullException (nameof (codeExecutionService));
		}

		[HttpPost ("run")]
		public async Task<ActionResult> Run ([FromBody] ProblemSolutionForTransferDto problemSolutionForTransfer)
		{
			CodeExecutionRequest codeExecutionRequest = new CodeExecutionRequest ()
			{
				SourceCode = problemSolutionForTransfer.EncodedSourceCode.FromBase64ToString (),
					TestCases = problemSolutionForTransfer.TestCases.Select (x => new TestCaseRequest ()
					{
						SampleInput = x.SampleInput,
							ExpectedOutput = x.ExpectedOutput
					}).ToList ()
			};

			var results = await _codeExecutionService.ExecuteAsync (codeExecutionRequest);

			return Ok (results);
		}

		// [HttpPost ("run1")]
		// public async Task<ActionResult> Run1 ([FromBody] ProblemSolutionForTransferDto problemSolutionForTransfer)
		// {
		// 	// // Decode
		// 	// var decodedSourceCode = problemSolutionForTransfer.EncodedSourceCode.FromBase64ToString ();
		// 	// List<string> inputList = problemSolutionForTransfer.TestCases.Select (x => x.SampleInput).ToList ();

		// 	// ProblemSolutionForExecutionDto problemSolution = new ProblemSolutionForExecutionDto ()
		// 	// {
		// 	// 	SourceCode = decodedSourceCode,
		// 	// 		InputList = inputList
		// 	// };

		// 	var problemSolution = _mapper.Map<ProblemSolutionForExecutionDto> (problemSolutionForTransfer);

		// 	// Compile and run, then get the result
		// 	// TODO: pass the sample input
		// 	var results = await _codeExecutionService.CompileAndRun (problemSolution);

		// 	// TODO: get the results
		// 	// TODO: CodeAssertionService? Assert each test case expected output with the real output

		// 	return Ok (results);
		// }

		// [HttpPost ("run2")]
		// public async Task<ActionResult> Run2 ([FromBody] string encodedSourceCode)
		// {
		// 	// Decode
		// 	var decodedSourceCode = Encoding.UTF8.GetString (Convert.FromBase64String (encodedSourceCode));

		// 	// Compile and run, then get the result
		// 	var result = await _codeExecutionService.CompileAndRun (decodedSourceCode);

		// 	return Ok (result);
		// }

	}
}
