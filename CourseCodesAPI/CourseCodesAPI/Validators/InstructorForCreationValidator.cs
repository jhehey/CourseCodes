using CourseCodesAPI.Models;
using FluentValidation;

namespace CourseCodesAPI.Validators
{
	public class InstructorForCreationValidator : AbstractValidator<InstructorForCreationDto>
	{
		public InstructorForCreationValidator ()
		{
			RuleFor (x => x.FirstName).NotEmpty ().MaximumLength (50);
			RuleFor (x => x.LastName).NotEmpty ().MaximumLength (50);
			RuleFor (x => x.Email).NotEmpty ().MaximumLength (255).EmailAddress ();
			RuleFor (x => x.PasswordHash).NotEmpty ().MaximumLength (100);
		}

	}
}
