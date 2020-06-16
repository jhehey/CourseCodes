using AutoBogus;
using AutoBogus.Conventions;
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

			AutoFaker.Configure (builder =>
			{
				builder.WithConventions ();
			});
		}
	}
}
