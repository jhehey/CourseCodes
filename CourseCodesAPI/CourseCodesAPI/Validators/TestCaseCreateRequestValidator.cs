using CourseCodesAPI.Models;
using FluentValidation;

namespace CourseCodesAPI.Validators
{
	public class TestCaseCreateRequestValidator : AbstractValidator<TestCaseCreateRequest>
	{
		public TestCaseCreateRequestValidator ()
		{
			RuleFor (x => x.SampleInput).NotEmpty ();
			RuleFor (x => x.ExpectedOutput).NotEmpty ();
		}
	}
}
