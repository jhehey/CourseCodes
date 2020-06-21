using CourseCodesAPI.Models;
using FluentValidation;

namespace CourseCodesAPI.Validators
{
	public class CourseForCreationValidator : AbstractValidator<CourseForCreationDto>
	{
		public CourseForCreationValidator ()
		{
			RuleFor (x => x.InstructorId).NotEmpty ();
			RuleFor (x => x.Title).NotEmpty ().MaximumLength (100);
			RuleFor (x => x.Description).NotEmpty ().MaximumLength (500);
		}
	}
}
