using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using AutoMapper;
using CourseCodesAPI.Contexts;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace CourseCodesAPI
{
	public class Startup
	{
		public Startup (IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices (IServiceCollection services)
		{
			// In memory database
			// services.AddDbContextPool<CourseCodesContext> (opt => opt.UseInMemoryDatabase ("CourseCodesDb"));

			// postgresql database
			services.AddDbContextPool<CourseCodesContext> (opt =>
				opt.UseNpgsql (Configuration.GetConnectionString ("CourseCodesConnection"))
			);
			services.AddAutoMapper (AppDomain.CurrentDomain.GetAssemblies ());
			services.AddControllers (
				setupAction => { setupAction.ReturnHttpNotAcceptable = true; }
			).AddXmlDataContractSerializerFormatters ();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure (IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment ())
			{
				app.UseDeveloperExceptionPage ();
			}
			else
			{
				app.UseExceptionHandler (a => a.Run (async context =>
				{
					var feature = context.Features.Get<IExceptionHandlerPathFeature> ();
					var exception = feature.Error;

					var result = JsonSerializer.Serialize (new { error = exception.Message });
					context.Response.ContentType = "application/json";
					context.Response.StatusCode = StatusCodes.Status500InternalServerError;
					await context.Response.WriteAsync (result);
				}));
			}

			app.UseHttpsRedirection ();

			app.UseRouting ();

			app.UseAuthorization ();

			app.UseEndpoints (endpoints =>
			{
				endpoints.MapControllers ();
			});
		}
	}
}
