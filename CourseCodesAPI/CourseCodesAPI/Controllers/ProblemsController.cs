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
	[Route ("api/problems")]
	public class ProblemsController : ControllerBase
	{
		private readonly CourseCodesContext _context;
		private readonly IMapper _mapper;
		public ProblemsController (CourseCodesContext context, IMapper mapper)
		{
			_context = context ??
				throw new System.ArgumentNullException (nameof (context));
			_mapper = mapper ??
				throw new System.ArgumentNullException (nameof (mapper));
		}

		[HttpPost]
		public async Task<ActionResult<ProblemResponse>> CreateProblem ([FromBody] ProblemCreateRequest problemToCreate)
		{
			// verify author exists
			var author = await _context.Accounts.FindAsync (problemToCreate.AuthorId);
			if (author == null) return NotFound ();

			// verify CourseIds exist
			var courses = await _context.Courses.Where (c => problemToCreate.CourseIds.Contains (c.Id)).ToListAsync ();
			if (courses == null) return NotFound ();

			// map request to entity
			var problem = _mapper.Map<Problem> (problemToCreate);
			problem.Author = author;
			problem.CourseProblems = courses.Select (course =>
				new CourseProblem () { Course = course, Problem = problem }
			).ToList ();

			// save problem
			_context.Problems.Add (problem);
			await _context.SaveChangesAsync ();

			// map entity to response
			var problemResponse = _mapper.Map<ProblemResponse> (problem);
			return CreatedAtAction (nameof (GetProblem), new { problemId = problemResponse.Id }, problemResponse);
		}

		[HttpGet ("{problemId:guid}")]
		public async Task<ActionResult<ProblemResponse>> GetProblem ([FromRoute] Guid problemId)
		{
			var problem = await _context.Problems
				.Include (p => p.Author)
				.Include (p => p.TestCases)
				.FirstOrDefaultAsync (p => p.Id == problemId);
			if (problem == null) return NotFound ();
			return Ok (_mapper.Map<ProblemResponse> (problem));
		}
	}
}
