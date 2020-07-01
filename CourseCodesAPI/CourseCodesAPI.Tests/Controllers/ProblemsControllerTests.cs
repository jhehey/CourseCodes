using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using AutoBogus;
using CourseCodesAPI.Entities;
using CourseCodesAPI.Models;
using CourseCodesAPI.Tests.Helpers;
using FluentAssertions;
using Flurl.Http;
using Microsoft.AspNetCore.Http;
using Xunit;

namespace CourseCodesAPI.Tests.Controllers
{
	public class ProblemsControllerTests : BaseTest
	{
		public AutoFaker<ProblemCreateRequest> ProblemFaker { get; set; }
		public AutoFaker<TestCaseCreateRequest> TestCaseFaker { get; set; }
		protected Repository repository { get; set; }
		public ProblemsControllerTests ()
		{
			repository = new Repository ();
			ProblemFaker = repository.ProblemFaker;
			TestCaseFaker = repository.TestCaseFaker;
		}

		[Fact]
		public async Task CreateProblem ()
		{
			var course = (await repository.GetCourses (1)).FirstOrDefault ();
			var fakeProblem = ProblemFaker.Generate ();
			fakeProblem.AuthorId = course.Instructor.AccountId;
			fakeProblem.CourseIds = new List<System.Guid> ()
			{
				course.Id
			};
			fakeProblem.TestCases = new List<TestCaseCreateRequest> ()
			{
				TestCaseFaker.Generate (),
					TestCaseFaker.Generate ()
			};

			// act
			var url = Routes.Problems;
			var response = await url.PostJsonAsync (fakeProblem);
			var problemResponse = await response.GetJsonAsync<ProblemResponse> ();
			var problemId = response.GetGuidFromLocation ();

			// Assert
			response.StatusCode.Should ().Be (StatusCodes.Status201Created);
			response.ShouldBeContentTypeJson ();

			problemResponse.Id.Should ().Be (problemId);
			problemResponse.Title.Should ().NotBeNullOrEmpty ();
			problemResponse.Statement.Should ().NotBeNullOrEmpty ();
			problemResponse.Author.Should ().NotBeNull ();
			problemResponse.TestCases.Should ().NotBeNull ();
		}
	}
}
