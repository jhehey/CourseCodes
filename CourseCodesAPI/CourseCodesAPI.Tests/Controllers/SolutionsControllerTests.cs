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
	public class SolutionsControllerTests : BaseTest
	{
		public AutoFaker<SolutionCreateRequest> SolutionFaker { get; set; }
		protected Repository repository { get; set; }
		public SolutionsControllerTests ()
		{
			repository = new Repository ();
			SolutionFaker = repository.SolutionFaker;
		}

		// [Fact]
		// public async Task CreateSolution ()
		// {
		// 	var student = (await repository.GetStudents (1)).FirstOrDefault ();
		// 	var problem = (await repository.GetCourseAndProblems (1)).Problems.FirstOrDefault ();
		// 	var fakeSolution = SolutionFaker.Generate ();
		// 	fakeSolution.StudentId = student.Id;
		// 	fakeSolution.CourseProblemId = problem.;

		// 	// act
		// 	var url = Routes.Solutions;
		// 	var response = await url.PostJsonAsync (fakeSolution);
		// 	var solutionResponse = await response.GetJsonAsync<SolutionResponse> ();
		// 	var solutionId = response.GetGuidFromLocation ();

		// 	// Assert
		// 	response.StatusCode.Should ().Be (StatusCodes.Status201Created);
		// 	response.ShouldBeContentTypeJson ();

		// 	solutionResponse.Id.Should ().Be (solutionId);
		// 	solutionResponse.SourceCode.Should ().NotBeNullOrEmpty ();
		// 	solutionResponse.Student.Should ().NotBeNull ();
		// 	solutionResponse.Problem.Should ().NotBeNull ();
		// }

	}
}
