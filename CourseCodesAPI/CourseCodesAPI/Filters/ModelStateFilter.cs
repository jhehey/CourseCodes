using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CourseCodesAPI.Filters
{
	public class ModelStateFilter : IAsyncActionFilter
	{
		public async Task OnActionExecutionAsync (ActionExecutingContext context, ActionExecutionDelegate next)
		{
			if (!context.ModelState.IsValid)
			{
				context.Result = new BadRequestObjectResult (context.ModelState);
			}
			await next ();
		}
	}
}
