using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoBogus;
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
		protected AutoFaker<TopicForCreationDto> TopicFaker { get; set; }
		protected Repository repository { get; set; }
		public TopicsControllerTests ()
		{
			repository = new Repository ();
			TopicFaker = repository.TopicFaker;
		}

		[Fact]
		public async Task CreateTopic ()
		{
			// Arrange
			var course = (await repository.GetCourses (1)).FirstOrDefault ();
			var fakeTopic = TopicFaker.Generate ();

			// Act
			var url = Routes.Courses.Slash (course.Id).Topics ();
			var response = await url.PostJsonAsync (fakeTopic);
			var topicDto = await response.GetJsonAsync<TopicDto> ();
			var topicId = response.GetGuidFromLocation ();

			Console.WriteLine (topicId);

			// Assert
			response.StatusCode.Should ().Be (StatusCodes.Status201Created);
			response.ShouldBeContentTypeJson ();

			topicId.Should ().NotBeEmpty ();
			topicDto.Should ().NotBeNull ();
			topicDto.Id.Should ().Be (topicId);

			topicDto.Title.Should ().NotBeNullOrEmpty ();
			topicDto.Course.Should ().NotBeNull ();
			topicDto.Course.Id.Should ().Be (course.Id);
		}

		[Fact]
		public async Task GetTopicById ()
		{
			// Arrange
			var topic = (await repository.GetTopics (1)).FirstOrDefault ();

			// Act
			var url = Routes.Courses.Slash (topic.Course.Id).Topics ().Slash (topic.Id);
			var response = await url.GetAsync ();
			var topicDto = await response.GetJsonAsync<TopicDto> ();

			// Assert
			response.StatusCode.Should ().Be (StatusCodes.Status200OK);
			response.ShouldBeContentTypeJson ();

			topicDto.Should ().NotBeNull ();
			topicDto.Id.Should ().Be (topic.Id);

			topicDto.Title.Should ().NotBeNullOrEmpty ();
			topicDto.Course.Should ().NotBeNull ();
			topicDto.Course.Id.Should ().Be (topic.Course.Id);
		}

		[Fact]
		public async Task GetTopics ()
		{
			// Arrange
			var topic = (await repository.GetTopics (1)).FirstOrDefault ();

			// Act
			var url = Routes.Courses.Slash (topic.Course.Id).Topics ();
			var response = await url.GetAsync ();
			var topics = await response.GetJsonAsync<IEnumerable<TopicDto>> ();

			// Assert
			response.StatusCode.Should ().Be (StatusCodes.Status200OK);
			response.ShouldBeContentTypeJson ();

			topics.Should ().NotBeEmpty ().And
				.Contain (t => t.Id == topic.Id);
			topics.Should ().OnlyContain (t => t.Course.Id == topic.Course.Id);

			topics.Select (t => t.Title).Should ().NotBeNullOrEmpty ();
			topics.Select (t => t.Course).Should ().NotBeNull ();
		}

	}
}
