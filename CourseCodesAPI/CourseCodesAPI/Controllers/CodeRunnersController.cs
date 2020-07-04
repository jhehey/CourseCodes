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
using Microsoft.EntityFrameworkCore;

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

		[HttpPost ("run2")]
		public async Task<ActionResult> Run2 ([FromBody] ProblemSolutionForTransferDto problemSolutionForTransfer)
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

	}
}
