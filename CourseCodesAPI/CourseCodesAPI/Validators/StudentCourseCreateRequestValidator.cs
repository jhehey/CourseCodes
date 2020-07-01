using CourseCodesAPI.Contexts;
using CourseCodesAPI.Models;
using FluentValidation;

namespace CourseCodesAPI.Validators
{
	public class StudentCourseCreateRequestValidator : AbstractValidator<StudentCourseCreateRequest>
	{
		public StudentCourseCreateRequestValidator (CourseCodesContext context)
		{
			RuleFor (x => x.StudentId).NotEmpty ();
			RuleFor (x => x.CourseId).NotEmpty ();
			RuleFor (x => x.Code).NotEmpty ().Length (6).WithMessage ("Code is invalid");
		}
	}
}
