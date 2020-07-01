using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoBogus;
using CourseCodesAPI.Models;
using CourseCodesAPI.Tests.Helpers;
using FluentAssertions;
using Flurl.Http;
using Microsoft.AspNetCore.Http;
using Xunit;

namespace CourseCodesAPI.Tests.Controllers
{
	public class CoursesControllerTests : BaseTest
	{
		// create instructor -> create course
		// create instructor -> create course -> create students -> students join course
		protected AutoFaker<CourseCreateRequest> CourseFaker { get; set; }
		protected Repository repository { get; set; }
		public CoursesControllerTests ()
		{
			repository = new Repository ();
			CourseFaker = repository.CourseFaker;
		}

		[Fact]
		public async Task CreateCourse ()
		{
			// Arrange
			var instructor = (await repository.GetInstructors (1)).FirstOrDefault ();
			var fakeCourse = CourseFaker.Generate ();
			fakeCourse.InstructorId = instructor.Id;

			// Act
			var url = Routes.Courses;
			var response = await url.PostJsonAsync (fakeCourse);
			var courseResponse = await response.GetJsonAsync<CourseResponse> ();
			var courseId = response.GetGuidFromLocation ();

			// Assert
			response.StatusCode.Should ().Be (StatusCodes.Status201Created);
			response.ShouldBeContentTypeJson ();

			courseId.Should ().NotBeEmpty ();
			courseResponse.Should ().NotBeNull ();
			courseResponse.Id.Should ().Be (courseId);

			courseResponse.Title.Should ().NotBeNullOrEmpty ();
			courseResponse.Description.Should ().NotBeNullOrEmpty ();
			courseResponse.Instructor.Id.Should ().Be (instructor.Id);
		}
	}
}
