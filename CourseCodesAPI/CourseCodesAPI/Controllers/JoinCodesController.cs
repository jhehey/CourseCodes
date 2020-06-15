using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;
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
	[Route ("api/joincodes")]
	public class JoinCodesController : ControllerBase
	{
		private readonly CourseCodesContext _context;
		private readonly IMapper _mapper;
		public JoinCodesController (CourseCodesContext context, IMapper mapper)
		{
			_context = context ??
				throw new System.ArgumentNullException (nameof (context));
			_mapper = mapper ??
				throw new System.ArgumentNullException (nameof (mapper));
		}

		[HttpGet ("{joinCodeId:guid}")]
		public async Task<ActionResult<JoinCodeDto>> GetJoinCode (
			[FromRoute] Guid courseId, [FromRoute] Guid joinCodeId
		)
		{
			// TODO: Maybe add authentication here? to make a get request to this route
			var joinCode = await _context.JoinCodes
				.FirstOrDefaultAsync (jc => jc.CourseId == courseId && jc.Id == joinCodeId);
			if (joinCode == null) return NotFound ();
			return Ok (_mapper.Map<JoinCodeDto> (joinCode));
		}

		[HttpPost]
		public async Task<ActionResult<JoinCodeDto>> CreateJoinCode ([FromBody] JoinCodeForCreationDto joinCodeToCreate)
		{
			// TODO: JoinCodeForCreationDto - Add Password?
			// check if courses exists
			var course = await _context.Courses.FindAsync (joinCodeToCreate.CourseId);
			if (course == null) return NotFound ();

			// generate join code
			// TODO: Generate join code
			JoinCode joinCode = new JoinCode ()
			{
				Code = "696969",
					DateExpires = DateTime.Now,
					CourseId = course.Id
			};

			// TODO: instead of add, update the joincode for the course if one already exists
			// because only 1 join code is available for the course.
			// when the instructor creates a new code, the other code is now invalid and replace by new one
			// save join code
			_context.JoinCodes.Add (joinCode);
			await _context.SaveChangesAsync ();

			// return dto
			var joinCodeToReturn = _mapper.Map<JoinCodeDto> (joinCode);
			return CreatedAtAction (nameof (GetJoinCode), new { joinCodeId = joinCodeToReturn.Id }, joinCodeToReturn);
		}
	}
}
