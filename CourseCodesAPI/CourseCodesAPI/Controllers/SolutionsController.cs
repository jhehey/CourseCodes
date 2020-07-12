using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CourseCodesAPI.Contexts;
using CourseCodesAPI.Entities;
using CourseCodesAPI.Models;
using CourseCodesAPI.Services.CodeExecutionService;
using CourseCodesAPI.Services.CodeExecutionService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CourseCodesAPI.Controllers
{
	[ApiController]
	[Route ("api/solutions")]
	public class SolutionsController : ControllerBase
	{
		private readonly CourseCodesContext _context;
		private readonly IMapper _mapper;
		private readonly ICodeExecutionService _codeExecutionService;

		public SolutionsController (CourseCodesContext context, IMapper mapper, ICodeExecutionService codeExecutionService)
		{
			_context = context ??
				throw new System.ArgumentNullException (nameof (context));
			_mapper = mapper ??
				throw new System.ArgumentNullException (nameof (mapper));
			_codeExecutionService = codeExecutionService ??
				throw new System.ArgumentNullException (nameof (codeExecutionService));
		}

		// [HttpPost]
		// public async Task<ActionResult<SolutionResponse>> CreateSolution ([FromBody] SolutionCreateRequest solutionToCreate)
		// {
		// 	// verify student exists
		// 	var student = await _context.Students.Include (s => s.Account).FirstOrDefaultAsync (s => s.Id == solutionToCreate.StudentId);
		// 	if (student == null) return NotFound ();

		// 	// verify problem exists
		// 	var problem = await _context.Problems.Include (p => p.TestCases).FirstOrDefaultAsync (p => p.Id == solutionToCreate.ProblemId);
		// 	if (problem == null) return NotFound ();

		// 	// map request to entity
		// 	var solution = _mapper.Map<Solution> (solutionToCreate);

		// 	// save solution
		// 	_context.Solutions.Add (solution);
		// 	await _context.SaveChangesAsync ();

		// 	// map entity to response
		// 	var solutionResponse = _mapper.Map<SolutionResponse> (solution);
		// 	return CreatedAtAction ("GetSolution", new { solutionId = solutionResponse.Id }, solutionResponse);
		// }

		[HttpGet ("{solutionId:guid}")]
		public async Task<ActionResult<SolutionResponse>> GetSolution ([FromRoute] Guid solutionId)
		{
			var solution = await _context.Solutions
				.Include (s => s.Student).ThenInclude (s => s.Account)
				// .Include (s => s.Problem).ThenInclude (p => p.TestCases) TODO: CourseProblem
				.FirstOrDefaultAsync (s => s.Id == solutionId);
			if (solution == null) return NotFound ();
			return Ok (_mapper.Map<SolutionResponse> (solution));
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<SolutionResponse>>> GetSolutions (
			[FromQuery] Guid studentId = default (Guid), [FromQuery] Guid courseId = default (Guid)
		)
		{
			IEnumerable<Solution> solutions;
			if (studentId != default (Guid) && courseId != default (Guid))
			{
				solutions = await _context.Solutions
					.Where (s => s.StudentId == studentId && s.CourseProblem.CourseId == courseId)
					.Include (s => s.CourseProblem).ThenInclude (cp => cp.Problem)
					.ToListAsync ();
			}
			else if (courseId != default (Guid) && studentId == default (Guid))
			{
				solutions = await _context.Solutions
					.Where (s => s.CourseProblem.CourseId == courseId)
					.Include (s => s.Student).ThenInclude (s => s.Account)
					.Include (s => s.CourseProblem).ThenInclude (cp => cp.Problem)
					.ToListAsync ();
			}
			else
			{
				solutions = await _context.Solutions.ToListAsync ();
			}
			return Ok (_mapper.Map<IEnumerable<SolutionResponse>> (solutions));
		}

		[HttpPost ("run")]
		public async Task<ActionResult> RunSolution ([FromBody] SolutionRunRequest solutionToRun)
		{
			// check if student exists
			var student = await _context.Students.FindAsync (solutionToRun.StudentId);
			if (student == null) return NotFound ();

			// check if problem exists
			var courseProblem = await _context.CourseProblems
				.Include (cp => cp.Problem)
				.ThenInclude (p => p.TestCases)
				.FirstOrDefaultAsync (p => p.Id == solutionToRun.CourseProblemId);
			if (courseProblem == null) return NotFound ();

			// solution doesnt exist, create. else update source code
			var solution = await _context.Solutions.FindAsync (solutionToRun.SolutionId);
			if (solution == null)
			{
				solution = _mapper.Map<Solution> (solutionToRun);
				_context.Solutions.Add (solution);
			}
			else
			{
				solution.SourceCode = solutionToRun.SourceCode;
			}

			await _context.SaveChangesAsync ();

			var codeExecutionRequest = new CodeExecutionRequest ()
			{
				SolutionId = solution.Id,
					SourceCode = solutionToRun.SourceCode,
					TestCases = _mapper.Map<List<TestCaseRequest>> (courseProblem.Problem.TestCases)
			};

			var results = await _codeExecutionService.ExecuteAsync (codeExecutionRequest);

			return Ok (results);
		}

		[HttpPost]
		public async Task<ActionResult> SubmitSolution ([FromBody] SolutionSubmitRequest solutionToSubmit)
		{
			var solution = await _context.Solutions.FindAsync (solutionToSubmit.SolutionId);
			if (solution == null) return NotFound ();

			solution.Status = 1; // submitted
			await _context.SaveChangesAsync ();

			return Ok (_mapper.Map<SolutionResponse> (solution));
		}
	}
}
