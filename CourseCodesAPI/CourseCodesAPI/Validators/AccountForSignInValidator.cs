using CourseCodesAPI.Models;
using FluentValidation;

namespace CourseCodesAPI.Validators
{
	public class AccountForSignInValidator : AbstractValidator<AccountForSignInDto>
	{
		public AccountForSignInValidator ()
		{
			RuleFor (x => x.Email).NotEmpty ().MaximumLength (255).EmailAddress ();
			RuleFor (x => x.PasswordHash).NotEmpty ().MaximumLength (100);
		}

	}
}
