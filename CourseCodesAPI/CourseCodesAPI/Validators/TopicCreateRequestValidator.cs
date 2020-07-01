using CourseCodesAPI.Models;
using FluentValidation;

namespace CourseCodesAPI.Validators
{
	public class TopicCreateRequestValidator : AbstractValidator<TopicCreateRequest>
	{
		public TopicCreateRequestValidator ()
		{
			RuleFor (x => x.Title).NotEmpty ().MaximumLength (100);
			RuleFor (x => x.Description).MaximumLength (500);
			RuleForEach (x => x.ProblemIds).NotEmpty ();
		}
	}
}
