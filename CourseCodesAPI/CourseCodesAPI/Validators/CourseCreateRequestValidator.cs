using System.Linq;
using CourseCodesAPI.Contexts;
using CourseCodesAPI.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace CourseCodesAPI.Validators
{
	public class CourseCreateRequestValidator : AbstractValidator<CourseCreateRequest>
	{
		public CourseCreateRequestValidator (CourseCodesContext context)
		{
			RuleFor (x => x.InstructorId).NotEmpty ();
			RuleFor (x => x.Description).NotEmpty ().MaximumLength (500);
			RuleFor (x => x.Title).NotEmpty ().MaximumLength (100);
		}

	}
}
