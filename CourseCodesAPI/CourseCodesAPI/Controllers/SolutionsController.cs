using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CourseCodesAPI.Contexts;
using CourseCodesAPI.Entities;
using CourseCodesAPI.Models;
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
		public SolutionsController (CourseCodesContext context, IMapper mapper)
		{
			_context = context ??
				throw new System.ArgumentNullException (nameof (context));
			_mapper = mapper ??
				throw new System.ArgumentNullException (nameof (mapper));
		}

		[HttpPost]
		public async Task<ActionResult<SolutionResponse>> CreateSolution ([FromBody] SolutionCreateRequest solutionToCreate)
		{
			// verify student exists
			var student = await _context.Students.Include (s => s.Account).FirstOrDefaultAsync (s => s.Id == solutionToCreate.StudentId);
			if (student == null) return NotFound ();

			// verify problem exists
			var problem = await _context.Problems.Include (p => p.TestCases).FirstOrDefaultAsync (p => p.Id == solutionToCreate.ProblemId);
			if (problem == null) return NotFound ();

			// map request to entity
			var solution = _mapper.Map<Solution> (solutionToCreate);

			// save solution
			_context.Solutions.Add (solution);
			await _context.SaveChangesAsync ();

			// map entity to response
			var solutionResponse = _mapper.Map<SolutionResponse> (solution);
			return CreatedAtAction ("GetSolution", new { solutionId = solutionResponse.Id }, solutionResponse);
		}

		[HttpGet ("{solutionId:guid}")]
		public async Task<ActionResult<SolutionResponse>> GetSolution ([FromRoute] Guid solutionId)
		{
			var solution = await _context.Solutions
				.Include (s => s.Student).ThenInclude (s => s.Account)
				.Include (s => s.Problem).ThenInclude (p => p.TestCases)
				.FirstOrDefaultAsync (s => s.Id == solutionId);
			if (solution == null) return NotFound ();
			return Ok (_mapper.Map<SolutionResponse> (solution));
		}
	}
}
