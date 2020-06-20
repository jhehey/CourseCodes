using System;
using System.Collections;
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
	[Route ("api/instructors")]
	public class InstructorsController : ControllerBase
	{
		private readonly CourseCodesContext _context;
		private readonly IMapper _mapper;
		public InstructorsController (CourseCodesContext context, IMapper mapper)
		{
			_context = context ??
				throw new System.ArgumentNullException (nameof (context));
			_mapper = mapper ??
				throw new System.ArgumentNullException (nameof (mapper));
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<InstructorDto>>> GetInstructors ()
		{
			var instructors = await _context.Instructors.Include (i => i.Account).ToListAsync ();
			return Ok (_mapper.Map<IEnumerable<InstructorDto>> (instructors));
		}

		[HttpGet ("{instructorId:guid}")]
		public async Task<ActionResult<InstructorDto>> GetInstructor ([FromRoute] Guid instructorId)
		{
			var instructor = await _context.Instructors.Include (i => i.Account)
				.FirstOrDefaultAsync (i => i.Id == instructorId);
			if (instructor == null) return NotFound ();
			return Ok (_mapper.Map<InstructorDto> (instructor));
		}

		[HttpPost]
		public async Task<ActionResult<InstructorDto>> CreateInstructor ([FromBody] InstructorForCreationDto instructorToCreate)
		{
			// map
			var instructor = _mapper.Map<Instructor> (instructorToCreate);

			// add date registered
			instructor.Account.DateRegistered = DateTime.Now;

			// save
			_context.Instructors.Add (instructor);
			await _context.SaveChangesAsync ();

			// return dto at location
			var instructorToReturn = _mapper.Map<InstructorDto> (instructor);
			return CreatedAtAction (nameof (GetInstructor), new { instructorId = instructorToReturn.Id }, instructorToReturn);
		}

		[HttpDelete ("{instructorId:guid}")]
		public async Task<IActionResult> DeleteInstructor ([FromRoute] Guid instructorId)
		{
			var instructor = await _context.Instructors.FindAsync (instructorId);
			if (instructor == null) return NotFound ();

			_context.Instructors.Remove (instructor);
			await _context.SaveChangesAsync ();
			return NoContent ();
		}
	}
}
