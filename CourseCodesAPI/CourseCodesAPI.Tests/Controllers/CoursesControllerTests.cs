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
		protected AutoFaker<CourseForCreationDto> CourseFaker { get; set; }
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
			var courseDto = await response.GetJsonAsync<CourseDto> ();
			var courseId = response.GetGuidFromLocation ();

			// Assert
			response.StatusCode.Should ().Be (StatusCodes.Status201Created);
			response.ShouldBeContentTypeJson ();

			courseId.Should ().NotBeEmpty ();
			courseDto.Should ().NotBeNull ();
			courseDto.Id.Should ().Be (courseId);

			courseDto.Title.Should ().NotBeNullOrEmpty ();
			courseDto.Description.Should ().NotBeNullOrEmpty ();
			courseDto.Instructor.Id.Should ().Be (instructor.Id);
		}

		[Fact]
		public async Task GetCourseById ()
		{
			// Arrange
			var course = (await repository.GetCourses (1)).FirstOrDefault ();

			// Act
			var url = Routes.Courses.Slash (course.Id);
			var response = await url.GetAsync ();
			var courseDto = await response.GetJsonAsync<CourseDto> ();

			// Assert
			response.StatusCode.Should ().Be (StatusCodes.Status200OK);
			response.ShouldBeContentTypeJson ();

			courseDto.Should ().NotBeNull ();
			courseDto.Id.Should ().Be (course.Id);

			courseDto.Title.Should ().NotBeNullOrEmpty ();
			courseDto.Description.Should ().NotBeNullOrEmpty ();
		}

		[Fact]
		public async Task GetCourses ()
		{
			// Arrange
			var course = (await repository.GetCourses (1)).FirstOrDefault ();

			// Act
			var url = Routes.Courses;
			var response = await url.GetAsync ();
			var courses = await response.GetJsonAsync<IEnumerable<CourseDto>> ();

			// Assert
			response.StatusCode.Should ().Be (StatusCodes.Status200OK);
			response.ShouldBeContentTypeJson ();

			courses.Should ().NotBeEmpty ().And
				.Contain (c => c.Id == course.Id);

			courses.Select (c => c.Title).Should ().NotBeNullOrEmpty ();
			courses.Select (c => c.Description).Should ().NotBeNullOrEmpty ();
		}
	}
}
