using System.Net;
using System.Net.Http;
using CourseCodesAPI.Contexts;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Xunit.Abstractions;

namespace CourseCodesAPI.Tests
{
	public class IntegrationTest
	{
		protected readonly HttpClient TestClient;
		protected readonly ITestOutputHelper output;

		public IntegrationTest (ITestOutputHelper output)
		{
			this.output = output;

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
			TestClient = appFactory.CreateClient ();
		}
	}
}
