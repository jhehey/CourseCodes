using CourseCodesAPI.Models;
using FluentValidation;

namespace CourseCodesAPI.Validators
{
	public class SolutionCreateRequestValidator : AbstractValidator<SolutionCreateRequest>
	{
		public SolutionCreateRequestValidator ()
		{
			RuleFor (x => x.SourceCode).NotEmpty ();
			RuleFor (x => x.StudentId).NotEmpty ();
			RuleFor (x => x.CourseProblemId).NotEmpty ();
		}
	}
}
