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
	[Route ("api/studentcourses")]
	public class StudentCoursesController : ControllerBase
	{
		private readonly CourseCodesContext _context;
		private readonly IMapper _mapper;
		public StudentCoursesController (CourseCodesContext context, IMapper mapper)
		{
			_context = context ??
				throw new System.ArgumentNullException (nameof (context));
			_mapper = mapper ??
				throw new System.ArgumentNullException (nameof (mapper));
		}

		[HttpGet ("{studentId:guid}/{courseId:guid}")]
		public async Task<ActionResult<StudentCourseDto>> GetStudentCourse ([FromQuery] Guid studentId, [FromQuery] Guid courseId)
		{
			if (studentId == null || courseId == null) return NotFound ();

			// find the StudentCourse w/ the composite key
			var studentCourse = await _context.StudentCourses
				.FirstOrDefaultAsync (sc => sc.StudentId == studentId && sc.CourseId == courseId);
			if (studentCourse == null) return NotFound ();

			// return dto
			return Ok (_mapper.Map<StudentCourseDto> (studentCourse));
		}

		[HttpPost]
		public async Task<ActionResult<StudentCourseDto>> CreateStudentCourse ([FromBody] StudentCourseForCreationDto studentCourseToCreate)
		{
			// find the course w/ courseId
			var course = await _context.Courses.FindAsync (studentCourseToCreate.CourseId);
			if (course == null) return NotFound ();

			// find the student w/ studentId
			var student = await _context.Students.FindAsync (studentCourseToCreate.StudentId);
			if (student == null) return NotFound ();

			// find join code
			var joinCode = await _context.JoinCodes.FirstOrDefaultAsync (jc => jc.Code == studentCourseToCreate.Code);
			if (joinCode == null) return NotFound ();

			// TODO: check if join code expired
			// ...
			// valid join code
			// create StudentCourse
			// if we map it to a student course entity, and it successfully saved to db and gets
			// student and course info, no need to find course and student. just check if it exist
			var studentCourse = _mapper.Map<StudentCourse> (studentCourseToCreate);

			// save the studentCourse
			_context.StudentCourses.Add (studentCourse);
			await _context.SaveChangesAsync ();

			// return dto
			var studentCourseToReturn = _mapper.Map<StudentCourseDto> (studentCourse);
			return CreatedAtAction (nameof (GetStudentCourse), new
				{
					studentId = studentCourse.StudentId,
						courseId = studentCourse.CourseId
				},
				studentCourseToReturn
			);
		}

	}
}
