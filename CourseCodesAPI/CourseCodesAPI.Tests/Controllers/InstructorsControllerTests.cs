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
	public class InstructorsControllerTests : BaseTest
	{
		protected AutoFaker<InstructorForCreationDto> InstructorFaker { get; set; }
		protected Repository repository { get; set; }

		public InstructorsControllerTests ()
		{
			repository = new Repository ();
			InstructorFaker = repository.InstructorFaker;
		}

		[Fact]
		public async Task CreateInstructor ()
		{
			// Arrange
			var fakeInstructor = InstructorFaker.Generate ();

			// Act
			var response = await Routes.Instructors.PostJsonAsync (fakeInstructor);
			var instructorDto = await response.GetJsonAsync<InstructorDto> ();
			var instructorId = response.GetGuidFromLocation ();

			// Assert
			response.StatusCode.Should ().Be (StatusCodes.Status201Created);
			response.ShouldBeContentTypeJson ();

			instructorId.Should ().NotBeEmpty ();
			instructorDto.Should ().NotBeNull ();
			instructorDto.Id.Should ().Be (instructorId);

			instructorDto.FullName.Should ().NotBeNullOrEmpty ();
			instructorDto.Email.Should ().NotBeNullOrEmpty ();
			instructorDto.AccountRole.Should ().Be (Role.Instructor);
		}

		[Fact]
		public async Task GetInstructorById ()
		{
			// Arrange
			var instructor = (await repository.GetInstructors (1)).FirstOrDefault ();

			// Act
			var response = await Routes.Instructors.Slash (instructor.Id).GetAsync ();
			var instructorDto = await response.GetJsonAsync<InstructorDto> ();

			// Assert
			response.StatusCode.Should ().Be (StatusCodes.Status200OK);
			response.ShouldBeContentTypeJson ();

			instructor.Id.Should ().NotBeEmpty ();
			instructorDto.Should ().NotBeNull ();
			instructorDto.Id.Should ().Be (instructor.Id);

			instructorDto.FullName.Should ().NotBeNullOrEmpty ();
			instructorDto.Email.Should ().NotBeNullOrEmpty ();
			instructorDto.AccountRole.Should ().Be (Role.Instructor);
		}

		[Fact]
		public async Task GetInstructors ()
		{
			// Arrange
			var instructor = (await repository.GetInstructors (1)).FirstOrDefault ();

			// Act
			var response = await Routes.Instructors.GetAsync ();
			var instructors = await response.GetJsonAsync<IEnumerable<InstructorDto>> ();

			// Assert
			response.StatusCode.Should ().Be (StatusCodes.Status200OK);
			response.ShouldBeContentTypeJson ();

			instructors.Should ().NotBeEmpty ().And
				.Contain (s => s.Id == instructor.Id);

			instructors.Select (s => s.FullName).Should ().NotBeNullOrEmpty ();
			instructors.Select (s => s.Email).Should ().NotBeNullOrEmpty ();
			instructors.Should ().OnlyContain (s => s.AccountRole == Role.Instructor);
		}

		[Fact]
		public async Task SignInAccountForInstructor_ShouldReturnAccountDto ()
		{
			// Arrange
			var fakeInstructor = InstructorFaker.Generate ();
			var createResponse = await Routes.Instructors.PostJsonAsync (fakeInstructor);
			var studentId = createResponse.GetGuidFromLocation ();

			var accountToSignIn = new AccountForSignInDto ()
			{
				Email = fakeInstructor.Email,
					PasswordHash = fakeInstructor.PasswordHash
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
			account.AccountRole.Should ().Be (Role.Instructor);
		}
	}
}
