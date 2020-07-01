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

		[HttpGet]
		public async Task<ActionResult<IEnumerable<CourseDto>>> GetCourses ([FromQuery] Guid instructorId = default (Guid))
		{
			IEnumerable<Course> courses;
			if (instructorId != default (Guid))
			{
				// Get courses by instructor Id
				courses = await _context.Courses.Where (c => c.InstructorId == instructorId).ToListAsync ();
			}
			else
			{
				courses = await _context.Courses.ToListAsync ();
			}

			// TODO: Query params if we want to include instructor info
			return Ok (_mapper.Map<IEnumerable<CourseDto>> (courses));
		}

		[HttpGet ("{courseId:guid}")]
		public async Task<ActionResult<CourseDto>> GetCourse ([FromRoute] Guid courseId)
		{
			// TODO: Query params if we want to include instructor info
			var course = await _context.Courses.FindAsync (courseId);
			if (course == null) return NotFound ();
			return Ok (_mapper.Map<CourseDto> (course));
		}

		[HttpPost]
		public async Task<ActionResult<CourseDto>> CreateCourse ([FromBody] CourseForCreationDto courseToCreate)
		{
			// find the instructor that wants to create the course
			var instructor = await _context.Instructors.FindAsync (courseToCreate.InstructorId);
			if (instructor == null) return NotFound ();

			// map dto to entity
			var course = _mapper.Map<Course> (courseToCreate);

			// save the course
			_context.Courses.Add (course);
			await _context.SaveChangesAsync ();

			// return dto at location
			var courseToReturn = _mapper.Map<CourseDto> (course);

			return CreatedAtAction (nameof (GetCourse), new { courseId = courseToReturn.Id }, courseToReturn);
		}
	}
}
