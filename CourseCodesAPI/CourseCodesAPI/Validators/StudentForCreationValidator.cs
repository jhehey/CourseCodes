using CourseCodesAPI.Contexts;
using CourseCodesAPI.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace CourseCodesAPI.Validators
{
	public class StudentForCreationValidator : AbstractValidator<StudentForCreationDto>
	{
		public StudentForCreationValidator (CourseCodesContext context)
		{
			RuleFor (x => x.FirstName).NotEmpty ().MaximumLength (50);
			RuleFor (x => x.LastName).NotEmpty ().MaximumLength (50);
			RuleFor (x => x.PasswordHash).NotEmpty ().MaximumLength (100);

			RuleFor (x => x.Email).NotEmpty ().MaximumLength (255)
				.EmailAddress ()
				.MustAsync (async (value, cancel) =>
				{
					return !(await context.Accounts.AnyAsync (a => a.Email == value));
				})
				.WithMessage ("Email Address must be unique");
		}
	}
}
