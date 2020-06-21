using System;
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

		[HttpGet ("{accountId:guid}")]
		public async Task<ActionResult<AccountDto>> GetAccount ([FromRoute] Guid accountId)
		{
			var account = await _context.Accounts.FindAsync (accountId);
			if (account == null) return NotFound ();
			return Ok (_mapper.Map<AccountDto> (account));
		}

		[HttpPost]
		public async Task<ActionResult<AccountDto>> SignIn ([FromBody] AccountForSignInDto accountToSignIn)
		{
			var account = await _context.Accounts.FirstOrDefaultAsync (a =>
				a.Email == accountToSignIn.Email && a.PasswordHash == accountToSignIn.PasswordHash
			);

			if (account == null) return NotFound ();
			return Ok (_mapper.Map<AccountDto> (account));
		}
	}
}
