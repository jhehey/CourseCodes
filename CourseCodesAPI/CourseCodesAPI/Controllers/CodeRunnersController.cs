using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CourseCodesAPI.Contexts;
using CourseCodesAPI.Services;
using CourseCodesAPI.Services.RemoteCodeExecution;
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
		public async Task<ActionResult> Run ([FromBody] string encodedSourceCode)
		{
			// Decode
			var decodedSourceCode = Encoding.UTF8.GetString (Convert.FromBase64String (encodedSourceCode));

			// Compile and run, then get the result
			var result = await _codeExecutionService.CompileAndRun (decodedSourceCode);

			return Ok (result);

			// Pass to code execution service
			// _codeExecutionService.ExecuteTask ()
			// get result

			// var sourceCodeInfo = await _sourceCodeService.SaveSourceCode (decodedSourceCode);

			// Execute Task(taskModel);

			// TODO: Catch errors when no available is found
			// var result = await _codeExecutionService.ExecuteTask (sourceCodeInfo);
			// return Ok (result + sourceCodeInfo.SolutionName + sourceCodeInfo.Filename);
		}
	}
}
