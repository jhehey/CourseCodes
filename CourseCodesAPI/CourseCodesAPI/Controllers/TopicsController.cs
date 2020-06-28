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

		[HttpGet]
		public async Task<ActionResult<IEnumerable<TopicDto>>> GetTopics ([FromRoute] Guid courseId)
		{
			var topics = await _context.Topics.Include (t => t.Course).Where (t => t.CourseId == courseId).ToListAsync ();
			return Ok (_mapper.Map<IEnumerable<TopicDto>> (topics));
		}

		[HttpGet ("{topicId:guid}")]
		public async Task<ActionResult<TopicDto>> GetTopic ([FromRoute] Guid courseId, [FromRoute] Guid topicId)
		{
			var topic = await _context.Topics.Include (t => t.Course).FirstOrDefaultAsync (t => t.Id == topicId && t.CourseId == courseId);
			if (topic == null) return NotFound ();
			return Ok (_mapper.Map<TopicDto> (topic));
		}

		[HttpPost]
		public async Task<ActionResult<TopicDto>> CreateTopic ([FromRoute] Guid courseId, [FromBody] TopicForCreationDto topicToCreate)
		{
			// find the course we want the topic created to
			var course = await _context.Courses.FindAsync (courseId);
			if (course == null) return NotFound ();

			// map dto to entity
			var topic = _mapper.Map<Topic> (topicToCreate);

			// save the topic
			course.Topics.Add (topic);
			await _context.SaveChangesAsync ();

			// return dto at location
			var topicToReturn = _mapper.Map<TopicDto> (topic);

			return CreatedAtAction (nameof (GetTopic), new { courseId = courseId, topicId = topicToReturn.Id }, topicToReturn);
		}
	}
}
