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
	[Route ("api/students")]
	public class StudentsController : ControllerBase
	{
		private readonly CourseCodesContext _context;
		private readonly IMapper _mapper;
		public StudentsController (CourseCodesContext context, IMapper mapper)
		{
			_context = context ??
				throw new System.ArgumentNullException (nameof (context));
			_mapper = mapper ??
				throw new System.ArgumentNullException (nameof (mapper));
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<StudentResponse>>> GetStudentsByCourseId ([FromQuery] Guid courseId)
		{
			IEnumerable<Student> students;
			if (courseId != null)
			{
				students = await _context.StudentCourses
					.Include (sc => sc.Student)
					.ThenInclude (s => s.Account)
					.Where (sc => sc.CourseId == courseId)
					.Select (sc => sc.Student)
					.ToListAsync ();
			}
			else
			{
				students = await _context.Students
					.Include (s => s.Account)
					.ToListAsync ();
			}

			return Ok (_mapper.Map<IEnumerable<StudentResponse>> (students));
		}
	}
}
