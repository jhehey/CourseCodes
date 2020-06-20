using System.Collections;
using System.Collections.Generic;
using System.Linq;
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
	public class StudentsControllerTests : BaseTest
	{
		[Fact]
		public async Task CreateStudent_ShouldReturnCreatedResource ()
		{
			// Arrange
			var fakeStudent = AutoFaker.Generate<StudentForCreationDto> ();

			// Act
			var response = await Routes.Students.PostJsonAsync (fakeStudent);
			var studentDto = await response.GetJsonAsync<StudentDto> ();
			var studentId = response.GetGuidFromLocation ();

			// Assert
			response.StatusCode.Should ().Be (StatusCodes.Status201Created);
			response.ShouldBeContentTypeJson ();

			studentId.Should ().NotBeEmpty ();
			studentDto.Should ().NotBeNull ();
			studentDto.Id.Should ().Be (studentId);

			studentDto.FullName.Should ().NotBeNullOrEmpty ();
			studentDto.Email.Should ().NotBeNullOrEmpty ();
		}

		[Fact]
		public async Task GetStudentById_ShouldReturnStudentWhenStudentIsCreated ()
		{
			// Arrange
			var fakeStudent = AutoFaker.Generate<StudentForCreationDto> ();
			var createResponse = await Routes.Students.PostJsonAsync (fakeStudent);
			var studentId = createResponse.GetGuidFromLocation ();

			// Act
			var response = await Routes.Students.Slash (studentId).GetAsync ();
			var studentDto = await response.GetJsonAsync<StudentDto> ();

			// Assert
			response.StatusCode
				.Should ().Be (StatusCodes.Status200OK);
			response
				.ShouldBeContentTypeJson ();

			studentId.Should ().NotBeEmpty ();
			studentDto.Should ().NotBeNull ();
			studentDto.Id.Should ().Be (studentId);

			studentDto.FullName.Should ().NotBeNullOrEmpty ();
			studentDto.Email.Should ().NotBeNullOrEmpty ();
		}

		[Fact]
		public async Task GetStudents_ShouldNotBeEmptyWhenStudentIsCreated ()
		{
			// Arrange
			var fakeStudent = AutoFaker.Generate<StudentForCreationDto> ();
			var createResponse = await Routes.Students.PostJsonAsync (fakeStudent);
			var studentId = createResponse.GetGuidFromLocation ();

			// Act
			var response = await Routes.Students.GetAsync ();
			var students = await response.GetJsonAsync<IEnumerable<StudentDto>> ();

			// Assert
			response.StatusCode.Should ().Be (StatusCodes.Status200OK);
			response.ShouldBeContentTypeJson ();

			students.Should ().NotBeEmpty ().And
				.Contain (s => s.Id == studentId);

			students.Select (s => s.FullName).Should ().NotBeNullOrEmpty ();
			students.Select (s => s.Email).Should ().NotBeNullOrEmpty ();
		}
	}
}
