using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using CourseCodesAPI.Models;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Xunit;

namespace CourseCodesAPI.Tests.Controllers
{
	public class StudentsControllerTests : IntegrationTest
	{
		[Fact]
		public async Task CreateStudent_ValidParameters_ReturnsCreatedAt ()
		{
			// Arrange
			StudentForCreationDto studentToCreate = new StudentForCreationDto ()
			{
				FirstName = "fname1",
					LastName = "lname1",
					Email = "email1",
			};
			var studentJson = JsonSerializer.Serialize (studentToCreate);

			// Act
			var response = await TestClient.PostAsync ("https://localhost:5001/api/students",
				new StringContent (studentJson, Encoding.UTF8, "application/json")
			);

			var content = await response.Content.ReadAsStringAsync ();
			var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
			StudentDto studentDto = JsonSerializer.Deserialize<StudentDto> (content, options);
			Guid locationStudentId = new Guid (response.Headers.Location.Segments.LastOrDefault ());

			// Assert
			response.StatusCode
				.Should ().Be (StatusCodes.Status201Created);
			locationStudentId
				.Should ().Be (studentDto.Id, "Location uri must return the student Id");
		}

	}
}
