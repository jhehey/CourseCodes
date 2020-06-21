using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoBogus;
using CourseCodesAPI.Entities;
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
		protected AutoFaker<StudentForCreationDto> CreateFaker { get; set; }

		public StudentsControllerTests ()
		{
			CreateFaker = new AutoFaker<StudentForCreationDto> ();
			CreateFaker.RuleFor (dto => dto.PasswordHash, fake => fake.Random.Hash (64));
			CreateFaker.RuleFor (dto => dto.AccountRole, fake => Role.Student);
		}

		[Fact]
		public async Task CreateStudent_ShouldReturnCreatedResource ()
		{
			// Arrange
			var fakeStudent = CreateFaker.Generate ();

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
			studentDto.AccountRole.Should ().Be (Role.Student);
		}

		[Fact]
		public async Task GetStudentById_ShouldReturnStudentWhenStudentIsCreated ()
		{
			// Arrange
			var fakeStudent = CreateFaker.Generate ();
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
			studentDto.AccountRole.Should ().Be (Role.Student);
		}

		[Fact]
		public async Task GetStudents_ShouldNotBeEmptyWhenStudentIsCreated ()
		{
			// Arrange
			var fakeStudent = CreateFaker.Generate ();
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
			students.Should ().OnlyContain (s => s.AccountRole == Role.Student);
		}

		[Fact]
		public async Task SignInAccountForStudent_ShouldReturnAccountDto ()
		{
			// Arrange
			var fakeStudent = CreateFaker.Generate ();
			var createResponse = await Routes.Students.PostJsonAsync (fakeStudent);
			var studentId = createResponse.GetGuidFromLocation ();

			var accountToSignIn = new AccountForSignInDto ()
			{
				Email = fakeStudent.Email,
					PasswordHash = fakeStudent.PasswordHash
			};

			// Act
			var response = await Routes.Accounts.PostJsonAsync (accountToSignIn);
			var account = await response.GetJsonAsync<AccountDto> ();

			// Assert
			response.StatusCode.Should ().Be (StatusCodes.Status200OK);
			response.ShouldBeContentTypeJson ();

			account.Should ().NotBeNull ();
			account.Id.Should ().NotBeEmpty ().And.Should ().NotBe (Guid.Empty);
			account.FullName.Should ().NotBeNullOrEmpty ();
			account.Email.Should ().NotBeNullOrEmpty ();
			account.AccountRole.Should ().Be (Role.Student);
		}
	}
}
