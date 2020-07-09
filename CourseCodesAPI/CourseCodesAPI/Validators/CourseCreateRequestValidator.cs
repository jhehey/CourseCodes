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
			RuleFor (x => x.CourseName).NotEmpty ().MaximumLength (100);
			RuleFor (x => x.Term).NotEmpty ().MaximumLength (20);
			RuleFor (x => x.Section).NotEmpty ().MaximumLength (10);
			RuleFor (x => x.Capacity).GreaterThan (0);
		}
	}
}
