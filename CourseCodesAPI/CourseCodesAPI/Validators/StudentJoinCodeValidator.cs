using CourseCodesAPI.Models;
using FluentValidation;

namespace CourseCodesAPI.Validators
{
	public class StudentJoinCodeValidator : AbstractValidator<StudentJoinCodeDto>
	{
		public StudentJoinCodeValidator ()
		{
			RuleFor (x => x.StudentId).NotEmpty ();
			RuleFor (x => x.Code).NotEmpty ().Length (6);
		}
	}
}
