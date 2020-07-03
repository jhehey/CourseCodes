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
	[Route ("api/courses/{courseId:guid}/joincodes")]
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

		[HttpGet]
		public async Task<ActionResult<JoinCodeResponse>> GetCode ([FromRoute] Guid courseId)
		{
			var course = await _context.Courses.Include (c => c.JoinCode).FirstOrDefaultAsync (c => c.Id == courseId);
			if (course == null) return NotFound ();

			return Ok (_mapper.Map<JoinCodeResponse> (course.JoinCode));
		}

		[HttpPost ("generate")]
		public async Task<ActionResult<JoinCodeResponse>> GenerateNewCode ([FromRoute] Guid courseId)
		{
			var course = await _context.Courses.Include (c => c.JoinCode).FirstOrDefaultAsync (c => c.Id == courseId);
			if (course == null) return NotFound ();

			var newCode = JoinCodeGenerator.Generate (6);
			// TODO: Handle duplicate join code

			if (course.JoinCode == null) course.JoinCode = new JoinCode ();
			course.JoinCode.Code = newCode;

			await _context.SaveChangesAsync ();

			return Ok (_mapper.Map<JoinCodeResponse> (course.JoinCode));
		}
	}
}
