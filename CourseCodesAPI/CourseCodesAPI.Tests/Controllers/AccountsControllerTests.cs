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
	public class AccountsControllerTests : BaseTest
	{
		protected AutoFaker<AccountCreateRequest> StudentFaker { get; set; }
		protected AutoFaker<AccountCreateRequest> InstructorFaker { get; set; }
		protected Repository repository { get; set; }
		public AccountsControllerTests ()
		{
			repository = new Repository ();
			StudentFaker = repository.StudentFaker;
			InstructorFaker = repository.InstructorFaker;
		}

		[Fact]
		public async Task CreateStudentAccount ()
		{
			var fakeStudent = StudentFaker.Generate ();
			var url = Routes.Accounts;
			var response = await url.PostJsonAsync (fakeStudent);
			var accountResponse = await response.GetJsonAsync<AccountResponse> ();
			var accountId = response.GetGuidFromLocation ();

			// assert
			response.StatusCode.Should ().Be (StatusCodes.Status201Created);
			response.ShouldBeContentTypeJson ();
			accountResponse.Id.Should ().Be (accountId);
			accountResponse.AccountRole.Should ().Be (Role.Student);
		}

		[Fact]
		public async Task SignInStudentSuccess ()
		{
			// Create Student
			var fakeStudent = StudentFaker.Generate ();
			await Routes.Accounts.PostJsonAsync (fakeStudent);

			// SignIn
			var signInRequest = new AccountSignInRequest ()
			{
				Email = fakeStudent.Email,
					PasswordHash = fakeStudent.PasswordHash
			};
			var url = Routes.Authenticate;
			var response = await url.PostJsonAsync (signInRequest);
			var studentResponse = await response.GetJsonAsync<StudentResponse> ();

			// assert
			response.StatusCode.Should ().Be (StatusCodes.Status200OK);
			response.ShouldBeContentTypeJson ();
			studentResponse.AccountRole.Should ().Be (Role.Student);
		}

		[Fact]
		public async Task CreateInstructorAccount ()
		{
			var fakeInstructor = InstructorFaker.Generate ();

			var url = Routes.Accounts;
			var response = await url.PostJsonAsync (fakeInstructor);
			var accountResponse = await response.GetJsonAsync<AccountResponse> ();
			var accountId = response.GetGuidFromLocation ();

			// assert
			response.StatusCode.Should ().Be (StatusCodes.Status201Created);
			response.ShouldBeContentTypeJson ();
			accountResponse.Id.Should ().Be (accountId);
			accountResponse.AccountRole.Should ().Be (Role.Instructor);
		}

		[Fact]
		public async Task SignInInstructorSuccess ()
		{
			// Create Instructor
			var fakeInstructor = InstructorFaker.Generate ();
			await Routes.Accounts.PostJsonAsync (fakeInstructor);

			// SignIn
			var signInRequest = new AccountSignInRequest ()
			{
				Email = fakeInstructor.Email,
					PasswordHash = fakeInstructor.PasswordHash
			};
			var url = Routes.Authenticate;
			var response = await url.PostJsonAsync (signInRequest);
			var instructorResponse = await response.GetJsonAsync<InstructorResponse> ();

			// assert
			response.StatusCode.Should ().Be (StatusCodes.Status200OK);
			response.ShouldBeContentTypeJson ();
			instructorResponse.AccountRole.Should ().Be (Role.Instructor);
		}
	}
}
