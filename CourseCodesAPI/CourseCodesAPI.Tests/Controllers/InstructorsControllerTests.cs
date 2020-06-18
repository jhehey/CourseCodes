using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoBogus;
using CourseCodesAPI.Models;
using CourseCodesAPI.Tests.Helpers;
using FluentAssertions;
using Flurl;
using Flurl.Http;
using Microsoft.AspNetCore.Http;
using Xunit;

namespace CourseCodesAPI.Tests.Controllers
{
	public class InstructorsControllerTests : BaseTest
	{
		[Fact]
		public async Task CreateInstructor_ShouldReturnCreatedResource ()
		{
			// Arrange
			var fakeInstructor = AutoFaker.Generate<InstructorForCreationDto> ();

			// Act
			var response = await Routes.Instructors.PostJsonAsync (fakeInstructor);
			var instructorDto = await response.GetJsonAsync<InstructorDto> ();
			var instructorId = response.GetGuidFromLocation ();

			// Assert
			response.StatusCode
				.Should ().Be (StatusCodes.Status201Created);
			response
				.ShouldBeContentTypeJson ();

			instructorId
				.Should ().NotBeEmpty ();
			instructorDto
				.Should ().NotBeNull ();
			instructorDto.Id
				.Should ().Be (instructorId);
		}

		[Fact]
		public async Task GetInstructorById_ShouldReturnInstructorWhenInstructorIsCreated ()
		{
			// Arrange
			var fakeInstructor = AutoFaker.Generate<InstructorForCreationDto> ();
			var createResponse = await Routes.Instructors.PostJsonAsync (fakeInstructor);
			var instructorId = createResponse.GetGuidFromLocation ();

			// Act
			var response = await Routes.Instructors.Slash (instructorId).GetAsync ();
			var instructorDto = await response.GetJsonAsync<InstructorDto> ();

			// Assert
			response.StatusCode
				.Should ().Be (StatusCodes.Status200OK);
			response
				.ShouldBeContentTypeJson ();

			instructorId
				.Should ().NotBeEmpty ();
			instructorDto
				.Should ().NotBeNull ();
			instructorDto.Id
				.Should ().Be (instructorId);
		}

		[Fact]
		public async Task GetInstructor_ShouldNotBeEmptyWhenInstructorIsCreated ()
		{
			// Arrange
			var fakeInstructor = AutoFaker.Generate<InstructorForCreationDto> ();
			var createResponse = await Routes.Instructors.PostJsonAsync (fakeInstructor);
			var instructorId = createResponse.GetGuidFromLocation ();

			// Act
			var response = await Routes.Instructors.GetAsync ();
			var instructors = await response.GetJsonAsync<IEnumerable<InstructorDto>> ();

			// Assert
			response.StatusCode
				.Should ().Be (StatusCodes.Status200OK);
			response
				.ShouldBeContentTypeJson ();

			instructors
				.Should ().NotBeEmpty ().And
				.Contain (s => s.Id == instructorId);
		}
	}
}
