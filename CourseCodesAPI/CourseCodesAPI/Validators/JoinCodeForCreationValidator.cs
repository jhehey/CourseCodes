using CourseCodesAPI.Models;
using FluentValidation;

namespace CourseCodesAPI.Validators
{
	public class JoinCodeForCreationValidator : AbstractValidator<JoinCodeForCreationDto>
	{
		public JoinCodeForCreationValidator ()
		{
			RuleFor (x => x.CourseId).NotEmpty ();
		}
	}
}
