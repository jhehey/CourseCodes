using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CourseCodesAPI.Contexts;
using CourseCodesAPI.Entities;
using CourseCodesAPI.Helpers;
using CourseCodesAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CourseCodesAPI.Controllers
{
	[ApiController]
	[Route ("api/courses/{courseId:guid}/topics")]
	public class TopicsController : ControllerBase
	{
		private readonly CourseCodesContext _context;
		private readonly IMapper _mapper;
		public TopicsController (CourseCodesContext context, IMapper mapper)
		{
			_context = context ??
				throw new System.ArgumentNullException (nameof (context));
			_mapper = mapper ??
				throw new System.ArgumentNullException (nameof (mapper));
		}

		[HttpPost]
		public async Task<ActionResult<TopicResponse>> CreateTopic ([FromRoute] Guid courseId, [FromBody] TopicCreateRequest topicToCreate)
		{
			// find course this topic is assigned
			var course = await _context.Courses.FindAsync (courseId);
			if (course == null) return NotFound ();

			// verify ProblemIds exists
			var problems = await _context.Problems.Where (p => topicToCreate.ProblemIds.Contains (p.Id)).ToListAsync ();
			if (problems == null) return NotFound ();

			// map request to entity
			var topic = _mapper.Map<Topic> (topicToCreate);
			topic.Course = course;
			topic.TopicProblems = problems.Select (problem =>
				new TopicProblem () { Topic = topic, Problem = problem }
			).ToList ();

			// save topic
			_context.Topics.Add (topic);
			await _context.SaveChangesAsync ();

			// map entity to response
			var topicResponse = _mapper.Map<TopicResponse> (topic);
			return CreatedAtAction ("GetTopic", new { courseId = courseId, topicId = topicResponse.Id }, topicResponse);
		}

		[HttpGet ("{topicId:guid}")]
		public async Task<ActionResult<TopicResponse>> GetTopic ([FromRoute] Guid courseId, [FromRoute] Guid topicId)
		{
			var topic = await _context.Topics
				.Include (t => t.Course)
				.Include (t => t.TopicProblems)
				.FirstOrDefaultAsync (t => t.CourseId == courseId && t.Id == topicId);
			if (topic == null) return NotFound ();
			return Ok (_mapper.Map<TopicResponse> (topic));
		}
	}
}
