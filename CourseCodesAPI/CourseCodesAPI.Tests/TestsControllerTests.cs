using System;
using System.Collections;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using AutoBogus;
using AutoBogus.Conventions;
using CourseCodesAPI.Models;
using CourseCodesAPI.Tests.Helpers;
using FluentAssertions;
using Flurl.Http;
using Flurl.Http.Testing;
using Xunit;

namespace CourseCodesAPI.Tests
{
	public class TestsControllerTests : BaseTest
	{
		[Fact]
		public async Task Flurl_Get_Test ()
		{
			// string getById = Routes.Students.GetById (new Guid ());

			var response = await Routes.Instructors.GetAsync ();
			response.EnsureSuccessStatusCode ();
			var content = await response.Content.ReadAsStringAsync ();
		}

		[Fact]
		public async Task Flurl_TryHttpTest_Test ()
		{
			HttpResponseMessage response = await Routes.Instructors.GetAsync ();
			IEnumerable<StudentDto> students = await response.GetJsonAsync<IEnumerable<StudentDto>> ();
		}

		[Fact]
		public async Task Flurl_TryPost_Test ()
		{
			StudentForCreationDto student = new StudentForCreationDto ()
			{
				FirstName = "fname1",
					LastName = "lname1",
					Email = "email1@gmail.com"
			};

			// POST- Ensure status 201 created
			HttpResponseMessage response = await Routes.Instructors.PostJsonAsync (student);

			// make sure this is json
			// make sure not empty, kase may cinreate
			StudentDto studentResponse = await response.GetJsonAsync<StudentDto> ();
		}

		[Fact]
		public void AutoBogusTest ()
		{
			var student = AutoFaker.Generate<StudentDto> ();
			var studentToCreate = AutoFaker.Generate<StudentForCreationDto> ();
			var sc = AutoFaker.Generate<StudentCourseDto> ();
			var scc = AutoFaker.Generate<StudentCourseForCreationDto> ();
		}
	}
}
