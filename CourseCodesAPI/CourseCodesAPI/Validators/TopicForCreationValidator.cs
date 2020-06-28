using CourseCodesAPI.Models;
using FluentValidation;

namespace CourseCodesAPI.Validators
{
	public class TopicForCreationValidator : AbstractValidator<TopicForCreationDto>
	{
		public TopicForCreationValidator ()
		{
			RuleFor (x => x.Title).NotEmpty ().MaximumLength (100);
			RuleFor (x => x.Description).MaximumLength (500);
		}
	}
}
