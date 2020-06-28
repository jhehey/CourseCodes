using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoBogus;
using AutoBogus.Conventions;
using CourseCodesAPI.Entities;
using CourseCodesAPI.Models;
using Flurl.Http;

namespace CourseCodesAPI.Tests.Helpers
{
	public class Repository
	{
		public AutoFaker<StudentForCreationDto> StudentFaker { get; set; }
		public AutoFaker<InstructorForCreationDto> InstructorFaker { get; set; }
		public AutoFaker<CourseForCreationDto> CourseFaker { get; set; }
		public AutoFaker<TopicForCreationDto> TopicFaker { get; set; }

		public Repository ()
		{
			AutoFaker.Configure (builder =>
			{
				builder.WithConventions ();
				builder.WithSkip<CourseForCreationDto> (course => course.InstructorId);
			});

			StudentFaker = new AutoFaker<StudentForCreationDto> ();
			StudentFaker.RuleFor (dto => dto.PasswordHash, fake => fake.Random.Hash (64));
			StudentFaker.RuleFor (dto => dto.AccountRole, fake => Role.Student);

			InstructorFaker = new AutoFaker<InstructorForCreationDto> ();
			InstructorFaker.RuleFor (dto => dto.PasswordHash, fake => fake.Random.Hash (64));
			InstructorFaker.RuleFor (dto => dto.AccountRole, fake => Role.Instructor);

			CourseFaker = new AutoFaker<CourseForCreationDto> ();
			CourseFaker.RuleFor (dto => dto.Title, fake => fake.Lorem.Sentence ());
			CourseFaker.RuleFor (dto => dto.Description, fake => fake.Lorem.Paragraph (1));

			TopicFaker = new AutoFaker<TopicForCreationDto> ();
			TopicFaker.RuleFor (dto => dto.Title, fake => fake.Lorem.Sentence ());
			TopicFaker.RuleFor (dto => dto.Description, fake => fake.Lorem.Paragraph (1));
		}

		public async Task<List<StudentDto>> GetStudents (int count = 1)
		{
			List<StudentDto> students = new List<StudentDto> ();
			for (int i = 0; i < count; i++)
			{
				var fakeStudent = StudentFaker.Generate ();
				var createResponse = await Routes.Students.PostJsonAsync (fakeStudent);
				var studentId = createResponse.GetGuidFromLocation ();
				var response = await Routes.Students.Slash (studentId).GetAsync ();
				var studentDto = await response.GetJsonAsync<StudentDto> ();
				students.Add (studentDto);
			}
			return students;
		}

		public async Task<List<InstructorDto>> GetInstructors (int count = 1)
		{
			List<InstructorDto> instructors = new List<InstructorDto> ();
			for (int i = 0; i < count; i++)
			{
				var fakeInstructor = InstructorFaker.Generate ();
				var createResponse = await Routes.Instructors.PostJsonAsync (fakeInstructor);
				var instructorId = createResponse.GetGuidFromLocation ();
				var response = await Routes.Instructors.Slash (instructorId).GetAsync ();
				var instructorDto = await response.GetJsonAsync<InstructorDto> ();
				instructors.Add (instructorDto);
			}
			return instructors;
		}

		public async Task<List<CourseDto>> GetCourses (int count = 1)
		{
			var instructor = (await GetInstructors (1)).FirstOrDefault ();
			List<CourseDto> courses = new List<CourseDto> ();
			for (int i = 0; i < count; i++)
			{
				var fakeCourse = CourseFaker.Generate ();
				fakeCourse.InstructorId = instructor.Id;
				var response = await Routes.Courses.PostJsonAsync (fakeCourse);
				var courseDto = await response.GetJsonAsync<CourseDto> ();
				var courseId = response.GetGuidFromLocation ();
				courses.Add (courseDto);
			}
			return courses;
		}

		public async Task<List<TopicDto>> GetTopics (int count = 1)
		{
			var course = (await GetCourses (1)).FirstOrDefault ();
			List<TopicDto> topics = new List<TopicDto> ();
			for (int i = 0; i < count; i++)
			{
				var fakeTopic = TopicFaker.Generate ();

				var url = Routes.Courses.Slash (course.Id).Topics ();
				var response = await url.PostJsonAsync (fakeTopic);
				var topicDto = await response.GetJsonAsync<TopicDto> ();
				var topicId = response.GetGuidFromLocation ();
				topics.Add (topicDto);
			}
			return topics;
		}
	}
}
