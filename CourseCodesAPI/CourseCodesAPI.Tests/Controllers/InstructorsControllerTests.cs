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
		protected AutoFaker<InstructorForCreationDto> CreateFaker { get; set; }

		public InstructorsControllerTests ()
		{
			CreateFaker = new AutoFaker<InstructorForCreationDto> ();
			CreateFaker.RuleFor (dto => dto.PasswordHash, fake => fake.Random.Hash ());
		}

		[Fact]
		public async Task CreateInstructor_ShouldReturnCreatedResource ()
		{
			// Arrange
			var fakeInstructor = CreateFaker.Generate ();

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
		}

		[Fact]
		public async Task GetInstructorById_ShouldReturnInstructorWhenInstructorIsCreated ()
		{
			// Arrange
			var fakeInstructor = CreateFaker.Generate ();
			var createResponse = await Routes.Instructors.PostJsonAsync (fakeInstructor);
			var instructorId = createResponse.GetGuidFromLocation ();

			// Act
			var response = await Routes.Instructors.Slash (instructorId).GetAsync ();
			var instructorDto = await response.GetJsonAsync<InstructorDto> ();

			// Assert
			response.StatusCode.Should ().Be (StatusCodes.Status200OK);
			response.ShouldBeContentTypeJson ();

			instructorId.Should ().NotBeEmpty ();
			instructorDto.Should ().NotBeNull ();
			instructorDto.Id.Should ().Be (instructorId);

			instructorDto.FullName.Should ().NotBeNullOrEmpty ();
			instructorDto.Email.Should ().NotBeNullOrEmpty ();
		}

		[Fact]
		public async Task GetInstructor_ShouldNotBeEmptyWhenInstructorIsCreated ()
		{
			// Arrange
			var fakeInstructor = CreateFaker.Generate ();
			var createResponse = await Routes.Instructors.PostJsonAsync (fakeInstructor);
			var instructorId = createResponse.GetGuidFromLocation ();

			// Act
			var response = await Routes.Instructors.GetAsync ();
			var instructors = await response.GetJsonAsync<IEnumerable<InstructorDto>> ();

			// Assert
			response.StatusCode.Should ().Be (StatusCodes.Status200OK);
			response.ShouldBeContentTypeJson ();

			instructors.Should ().NotBeEmpty ().And
				.Contain (s => s.Id == instructorId);

			instructors.Select (s => s.FullName).Should ().NotBeNullOrEmpty ();
			instructors.Select (s => s.Email).Should ().NotBeNullOrEmpty ();
		}

		[Fact]
		public async Task SignInAccountForInstructor_ShouldReturnAccountDto ()
		{
			// Arrange
			var fakeInstructor = CreateFaker.Generate ();
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
