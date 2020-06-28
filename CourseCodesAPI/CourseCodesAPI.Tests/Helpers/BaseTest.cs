using AutoBogus;
using AutoBogus.Conventions;
using CourseCodesAPI.Models;
using Flurl.Http;

namespace CourseCodesAPI.Tests.Helpers
{
	public class BaseTest
	{
		static BaseTest ()
		{
			FlurlHttp.Configure (settings =>
			{
				settings.HttpClientFactory = new CourseCodesHttpClientFactory ();
			});

			// AutoFaker.Configure (builder =>
			// {
			// 	builder.WithConventions ();
			// 	builder.WithSkip<CourseForCreationDto> (course => course.InstructorId);
			// });
		}
	}
}
