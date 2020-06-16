using System.Net;
using System.Net.Http;
using CourseCodesAPI.Contexts;
using Flurl.Http.Configuration;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace CourseCodesAPI.Tests.Helpers
{
	public class CourseCodesHttpClientFactory : DefaultHttpClientFactory
	{
		// override to customize how HttpClient is created/configured
		public override HttpClient CreateHttpClient (HttpMessageHandler handler)
		{
			var appFactory = new WebApplicationFactory<Startup> ()
				.WithWebHostBuilder (builder =>
				{
					builder.ConfigureServices (services =>
					{
						services.RemoveAll (typeof (CourseCodesContext));
						services.AddDbContextPool<CourseCodesContext> (opt =>
						{
							opt.UseInMemoryDatabase ("TestCourseCodesDb");
						});
					});
				});
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
			return appFactory.CreateClient ();
		}
	}
}
