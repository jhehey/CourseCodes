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
		public async Task<ActionResult<ProblemResponse>> GetProblem (
			[FromRoute] Guid problemId, [FromQuery] Guid courseId = default (Guid)
		)
		{
			if (courseId != default (Guid))
			{
				var courseProblem = await _context.CourseProblems
					.Include (cp => cp.Problem)
					.ThenInclude (p => p.Author)
					.Include (cp => cp.Problem)
					.ThenInclude (p => p.TestCases)
					.FirstOrDefaultAsync (cp => cp.ProblemId == problemId && cp.CourseId == courseId);
				return Ok (_mapper.Map<ProblemResponse> (courseProblem));
			}
			else
			{
				var problem = await _context.Problems
					.Include (p => p.Author)
					.Include (p => p.TestCases)
					.FirstOrDefaultAsync (p => p.Id == problemId);
				if (problem == null) return NotFound ();
				return Ok (_mapper.Map<ProblemResponse> (problem));
			}
		}

		[HttpGet]
		public async Task<IActionResult> GetProblems (
			[FromQuery] Guid authorId = default (Guid), [FromQuery] Guid courseId = default (Guid)
		)
		{
			IEnumerable<Problem> problems = new List<Problem> ();
			// TODO: Problems created by authorId for specific courseId
			// if (authorId != default (Guid))
			// {
			// 	problems = await _context.Problems
			// 		.Include (p => p.TestCases)
			// 		.Include (p => p.CourseProblems)
			// 		.ThenInclude (cp => cp.Course)
			// 		.Where (p => p.AuthorId == authorId)
			// 		.ToListAsync ();
			// }
			// else
			if (courseId != default (Guid))
			{
				problems = await _context.CourseProblems
					.Include (cp => cp.Problem.TestCases)
					.Where (cp => cp.CourseId == courseId)
					.Select (cp => cp.Problem)
					.ToListAsync ();
			}
			else
			{
				problems = await _context.Problems.ToListAsync ();
			}
			return Ok (_mapper.Map<IEnumerable<ProblemResponse>> (problems));
		}

		[HttpPost ("submitCount")]
		public async Task<IActionResult> GetProblemSubmitCounts ([FromBody] ProblemSubmitCountRequest request)
		{
			var courseExists = await _context.Courses.AnyAsync (c => c.Id == request.CourseId);
			if (!courseExists) return NotFound ();

			int studentCount = await _context.StudentCourses
				.Where (sc => sc.CourseId == request.CourseId)
				.CountAsync ();

			var response = await _context.CourseProblems
				.Where (cp => cp.CourseId == request.CourseId && request.ProblemIds.Contains (cp.ProblemId))
				.Select (cp => new
				{
					ProblemId = cp.ProblemId,
						SubmitCount = _context.Solutions
						.Where (s => s.CourseProblem.ProblemId == cp.ProblemId)
						.Select (s => s.Status)
						.Where (status => status == 1)
						.Count (),
						StudentCount = studentCount
				}).ToListAsync ();

			// var response = await _context.Solutions
			// 	.Include (s => s.CourseProblem)
			// 	.Where (s => s.CourseProblem.CourseId == request.CourseId)
			// 	.Select (s => new { ProblemId = s.CourseProblem.ProblemId, Submitted = s.Status })
			// 	.ToListAsync ();
			// .ToLookup (s => s.CourseProblem.ProblemId, s => s.Status)
			// .Select (l => new ProblemSubmitCountResponse ()
			// {
			// 	ProblemId = l.Key,
			// 		SubmitCount = l.FirstOrDefault (),
			// 		StudentCount = studentCount
			// });

			return Ok (response);
		}

	}
}
