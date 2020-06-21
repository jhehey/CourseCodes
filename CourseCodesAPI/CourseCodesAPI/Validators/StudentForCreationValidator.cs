using CourseCodesAPI.Models;
using FluentValidation;

namespace CourseCodesAPI.Validators
{
	public class StudentForCreationValidator : AbstractValidator<StudentForCreationDto>
	{
		public StudentForCreationValidator ()
		{
			RuleFor (x => x.FirstName).NotEmpty ().MaximumLength (50);
			RuleFor (x => x.LastName).NotEmpty ().MaximumLength (50);
			RuleFor (x => x.Email).NotEmpty ().MaximumLength (255).EmailAddress ();
			RuleFor (x => x.PasswordHash).NotEmpty ().MaximumLength (100);
		}
	}
}
