using System;
using System.Collections.Generic;
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
		public async Task<ActionResult<IEnumerable<StudentDto>>> GetStudents ()
		{
			var students = await _context.Students.Include (s => s.Account).ToListAsync ();
			return Ok (_mapper.Map<IEnumerable<StudentDto>> (students));
		}

		[HttpGet ("{studentId:guid}")]
		public async Task<ActionResult<StudentDto>> GetStudent ([FromRoute] Guid studentId)
		{
			var student = await _context.Students.Include (s => s.Account).FirstOrDefaultAsync (s => s.Id == studentId);
			if (student == null) return NotFound ();
			return Ok (_mapper.Map<StudentDto> (student));
		}

		[HttpPost]
		public async Task<ActionResult<StudentDto>> CreateStudent ([FromBody] StudentForCreationDto studentToCreate)
		{
			// map dto to entity
			var student = _mapper.Map<Student> (studentToCreate);

			// add date registered
			student.Account.DateRegistered = DateTime.Now;

			// save
			_context.Students.Add (student);
			await _context.SaveChangesAsync ();

			// return student dto at location
			var studentToReturn = _mapper.Map<StudentDto> (student);
			return CreatedAtAction (nameof (GetStudent), new { studentId = studentToReturn.Id }, studentToReturn);
		}

		[HttpDelete ("{studentId:guid}")]
		public async Task<IActionResult> DeleteStudent ([FromRoute] Guid studentId)
		{
			var student = await _context.Students.FindAsync (studentId);
			if (student == null) return NotFound ();

			_context.Students.Remove (student);
			await _context.SaveChangesAsync ();
			return NoContent ();
		}
	}
}
