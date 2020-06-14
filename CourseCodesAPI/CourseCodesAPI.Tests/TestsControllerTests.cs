using System.ComponentModel;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Xunit;
using Xunit.Abstractions;

namespace CourseCodesAPI.Tests
{
	public class TestsControllerTests : IntegrationTest
	{
		public TestsControllerTests (ITestOutputHelper output) : base (output) { }

		[Fact]
		public async void GetTests_WithoutParameters_ReturnsOk ()
		{
			// Arrange

			// Act
			var response = await TestClient.GetAsync ("https://localhost:5001/api/tests");
			var contents = await response.Content.ReadAsStringAsync ();
			// Assert
			response.StatusCode.Should ().Be (StatusCodes.Status200OK);
			contents.Should ().Be ("Test");
			output.WriteLine ("hehe");
		}
	}
}
