using CourseCodesAPI.Models;
using FluentValidation;

namespace CourseCodesAPI.Validators
{
	public class AccountSignInRequestValidator : AbstractValidator<AccountSignInRequest>
	{
		public AccountSignInRequestValidator ()
		{
			// dont give too much hints on the wrong sign in information
			RuleFor (x => x.Email).NotEmpty ().MaximumLength (255).EmailAddress ()
				.WithMessage ("Invalid Email/Password");
			RuleFor (x => x.PasswordHash).NotEmpty ().MaximumLength (100)
				.WithMessage ("Invalid Email/Password");
		}
	}
}
