using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
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
	[Route ("api/accounts")]
	public class AccountsController : ControllerBase
	{
		private readonly CourseCodesContext _context;
		private readonly IMapper _mapper;
		public AccountsController (CourseCodesContext context, IMapper mapper)
		{
			_context = context ??
				throw new System.ArgumentNullException (nameof (context));
			_mapper = mapper ??
				throw new System.ArgumentNullException (nameof (mapper));
		}

		[HttpPost]
		public async Task<ActionResult<AccountResponse>> CreateAccount ([FromBody] AccountCreateRequest accountToCreate)
		{
			// map request to entity
			var account = _mapper.Map<Account> (accountToCreate);

			// Role must be student/instructor only
			if (account.AccountRole == Role.Student) account.Student = new Student () { Account = account };
			else if (account.AccountRole == Role.Instructor) account.Instructor = new Instructor () { Account = account };
			else return BadRequest ();

			// save
			_context.Accounts.Add (account);
			await _context.SaveChangesAsync ();

			// return response at location
			var accountResponse = _mapper.Map<AccountResponse> (account);
			return CreatedAtAction (nameof (GetAccount), new { accountId = accountResponse.Id }, accountResponse);
		}

		[HttpGet ("{accountId:guid}")]
		public async Task<ActionResult<AccountResponse>> GetAccount ([FromRoute] Guid accountId)
		{
			var account = await _context.Accounts.FindAsync (accountId);
			if (account == null) return NotFound ();
			return Ok (_mapper.Map<AccountResponse> (account));
		}

		[HttpPost ("authenticate")]
		public async Task<IActionResult> SignIn ([FromBody] AccountSignInRequest accountToSignIn)
		{
			var account = await _context.Accounts
				.Include (a => a.Student)
				.Include (a => a.Instructor)
				.FirstOrDefaultAsync (a =>
					a.Email == accountToSignIn.Email && a.PasswordHash == accountToSignIn.PasswordHash
				);

			if (account == null) return NotFound ();
			if (account.AccountRole == Role.Student) return Ok (_mapper.Map<StudentResponse> (account));
			if (account.AccountRole == Role.Instructor) return Ok (_mapper.Map<InstructorResponse> (account));
			return NotFound ();
		}
	}
}
