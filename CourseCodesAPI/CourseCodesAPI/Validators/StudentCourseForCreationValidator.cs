using CourseCodesAPI.Models;
using FluentValidation;

namespace CourseCodesAPI.Validators
{
	public class StudentCourseForCreationValidator : AbstractValidator<StudentCourseForCreationDto>
	{
		public StudentCourseForCreationValidator ()
		{
			RuleFor (x => x.StudentId).NotEmpty ();
			RuleFor (x => x.CourseId).NotEmpty ();
			RuleFor (x => x.Code).NotEmpty ().Length (6);
		}

	}
}
