using CourseCodesAPI.Models;
using FluentValidation;

namespace CourseCodesAPI.Validators
{
	public class ProblemCreateRequestValidator : AbstractValidator<ProblemCreateRequest>
	{
		public ProblemCreateRequestValidator ()
		{
			RuleFor (x => x.Title).NotEmpty ().MaximumLength (100);
			RuleFor (x => x.Statement).NotEmpty ();
			RuleFor (x => x.AuthorId).NotEmpty ();
			RuleForEach (x => x.CourseIds).NotEmpty ();
			RuleForEach (x => x.TestCases).NotEmpty ();
		}
	}
}
