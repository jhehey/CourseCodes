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
	[Route ("api/courses")]
	public class CoursesController : ControllerBase
	{
		private readonly CourseCodesContext _context;
		private readonly IMapper _mapper;
		public CoursesController (CourseCodesContext context, IMapper mapper)
		{
			_context = context ??
				throw new System.ArgumentNullException (nameof (context));
			_mapper = mapper ??
				throw new System.ArgumentNullException (nameof (mapper));
		}

		[HttpPost]
		public async Task<ActionResult<CourseResponse>> CreateCourse ([FromBody] CourseCreateRequest courseToCreate)
		{
			// find the instructor that wants to create the course
			var instructor = await _context.Instructors.FindAsync (courseToCreate.InstructorId);
			if (instructor == null) return NotFound ();

			// map request to entity
			var course = _mapper.Map<Course> (courseToCreate);

			// save the course
			_context.Courses.Add (course);
			await _context.SaveChangesAsync ();

			// return response at location
			var courseToReturn = _mapper.Map<CourseResponse> (course);

			return CreatedAtAction (nameof (GetCourse), new { courseId = courseToReturn.Id }, courseToReturn);
		}

		[HttpGet ("{courseId:guid}")]
		public async Task<ActionResult<CourseResponse>> GetCourse ([FromRoute] Guid courseId)
		{
			// TODO: Query params if we want to include instructor info
			var course = await _context.Courses.FindAsync (courseId);
			if (course == null) return NotFound ();
			return Ok (_mapper.Map<CourseResponse> (course));
		}

		public async Task<ActionResult<IEnumerable<CourseResponse>>> GetCourses ()
		{
			var courses = await _context.Courses.ToListAsync ();
			return Ok (_mapper.Map<IEnumerable<CourseResponse>> (courses));
		}
	}
}
