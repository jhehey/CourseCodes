using CourseCodesAPI.Contexts;
using CourseCodesAPI.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace CourseCodesAPI.Validators
{
	public class AccountCreateRequestValidator : AbstractValidator<AccountCreateRequest>
	{
		public AccountCreateRequestValidator (CourseCodesContext context)
		{
			RuleFor (x => x.FirstName).NotEmpty ().MaximumLength (50);
			RuleFor (x => x.LastName).NotEmpty ().MaximumLength (50);
			RuleFor (x => x.PasswordHash).NotEmpty ().MaximumLength (100);
			RuleFor (x => x.AccountRole).NotEmpty ().IsInEnum ();
			RuleFor (x => x.Email).NotEmpty ().MaximumLength (255)
				.EmailAddress ()
				.MustAsync (async (email, cancel) =>
				{
					return !(await context.Accounts.AnyAsync (a => a.Email == email));
				})
				.WithMessage ("Email Address is already taken");
		}
	}
}
