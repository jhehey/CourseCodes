using CourseCodesAPI.Contexts;
using Microsoft.AspNetCore.Mvc;

namespace CourseCodesAPI.Controllers
{
	[ApiController]
	[Route ("api/tests")]
	public class TestController : ControllerBase
	{
		private readonly CourseCodesContext _context;
		public TestController (CourseCodesContext context)
		{
			_context = context ??
				throw new System.ArgumentNullException (nameof (context));
		}

		[HttpGet]
		public IActionResult GetTest ()
		{
			return Ok ("Test");
		}
	}
}
