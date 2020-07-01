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
	public class TopicsControllerTests : BaseTest
	{
		public AutoFaker<TopicCreateRequest> TopicFaker { get; set; }
		protected Repository repository { get; set; }
		public TopicsControllerTests ()
		{
			repository = new Repository ();
			TopicFaker = repository.TopicFaker;
		}

		[Fact]
		public async Task CreateTopic ()
		{
			var courseAndProblems = await repository.GetCourseAndProblems (1);
			var course = courseAndProblems.Course;
			var problem = courseAndProblems.Problems.FirstOrDefault ();
			var fakeTopic = TopicFaker.Generate ();
			fakeTopic.ProblemIds = new List<System.Guid> ()
			{
				problem.Id
			};

			// act
			var url = Routes.Courses.Slash (course.Id).Topics ();
			var response = await url.PostJsonAsync (fakeTopic);
			var topicResponse = await response.GetJsonAsync<TopicResponse> ();
			var topicId = response.GetGuidFromLocation ();

			// Assert
			response.StatusCode.Should ().Be (StatusCodes.Status201Created);
			response.ShouldBeContentTypeJson ();

			topicResponse.Id.Should ().Be (topicId);
			topicResponse.Title.Should ().NotBeNullOrEmpty ();
			topicResponse.Course.Should ().NotBeNull ();
			topicResponse.Problems.Should ().NotBeNull ();
		}
	}
}
