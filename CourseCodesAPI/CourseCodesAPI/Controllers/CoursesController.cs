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
using Microsoft.Extensions.Options;

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
		public async Task<IActionResult> CreateCourse (
			[FromBody] CourseCreateRequest courseToCreate, [FromServices] IOptions<ApiBehaviorOptions> apiBehaviorOptions
		)
		{
			// find the instructor that wants to create the course
			var instructor = await _context.Instructors.FindAsync (courseToCreate.InstructorId);
			if (instructor == null) return NotFound ();

			// instructor can't create course of the same course name to their own courses. but 2 different instructors, can have same course name
			var duplicateCourse = await _context.Courses.AnyAsync (c =>
				c.InstructorId == instructor.Id &&
				c.CourseName.ToUpper () == courseToCreate.CourseName.ToUpper () &&
				c.Term.ToUpper () == courseToCreate.Term.ToUpper () &&
				c.Section.ToUpper () == courseToCreate.Section.ToUpper ()
			);
			if (duplicateCourse)
			{
				ModelState.AddModelError (nameof (courseToCreate.CourseName), $"Error! Duplicate Course Exists...");
				return apiBehaviorOptions.Value.InvalidModelStateResponseFactory (ControllerContext);
			}

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

		[HttpGet]
		public async Task<ActionResult<IEnumerable<CourseResponse>>> GetCourses (
			[FromQuery] Guid instructorId = default (Guid), [FromQuery] Guid studentId = default (Guid)
		)
		{
			IEnumerable courses;
			if (instructorId != default (Guid))
			{
				courses = await _context.Courses
					.Where (c => c.InstructorId == instructorId)
					.ToListAsync ();
			}
			else if (studentId != default (Guid))
			{
				courses = await _context.StudentCourses
					.Include (sc => sc.Course).ThenInclude (c => c.Instructor).ThenInclude (i => i.Account)
					.Where (sc => sc.StudentId == studentId)
					.ToListAsync ();
			}
			else
			{
				courses = await _context.Courses.ToListAsync ();
			}
			return Ok (_mapper.Map<IEnumerable<CourseResponse>> (courses));
		}

		[HttpPost ("join")]
		public async Task<IActionResult> JoinCourse (
			[FromBody] JoinCourseRequest joinCourseRequest, [FromServices] IOptions<ApiBehaviorOptions> apiBehaviorOptions
		)
		{
			// find student that wants to join the course
			var student = await _context.Students.FindAsync (joinCourseRequest.StudentId);
			if (student == null) return NotFound ();

			// find the course
			var course = await _context.JoinCodes
				.Include (jc => jc.Course)
				.Where (jc => jc.Code == joinCourseRequest.Code)
				.Select (jc => jc.Course).FirstOrDefaultAsync ();
			if (course == null)
			{
				ModelState.AddModelError ("message", $"The code you entered is invalid");
				return apiBehaviorOptions.Value.InvalidModelStateResponseFactory (ControllerContext);
			}

			// check if student already is in that course
			var joined = await _context.StudentCourses.AnyAsync (sc => sc.StudentId == student.Id && sc.CourseId == course.Id);
			if (joined)
			{
				ModelState.AddModelError ("message", $"You have already joined the course");
				return apiBehaviorOptions.Value.InvalidModelStateResponseFactory (ControllerContext);
			}

			// create entity
			StudentCourse studentCourse = new StudentCourse ()
			{
				Student = student,
					Course = course
			};

			// save entity
			_context.StudentCourses.Add (studentCourse);
			await _context.SaveChangesAsync ();

			// map entity to response
			return Ok (_mapper.Map<JoinCourseResponse> (studentCourse));
		}
	}
}
