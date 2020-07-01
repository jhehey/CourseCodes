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
		public AutoFaker<AccountCreateRequest> StudentFaker { get; set; }
		public AutoFaker<AccountCreateRequest> InstructorFaker { get; set; }
		public AutoFaker<CourseCreateRequest> CourseFaker { get; set; }
		public AutoFaker<ProblemCreateRequest> ProblemFaker { get; set; }
		public AutoFaker<TestCaseCreateRequest> TestCaseFaker { get; set; }
		public AutoFaker<TopicCreateRequest> TopicFaker { get; set; }
		public AutoFaker<SolutionCreateRequest> SolutionFaker { get; set; }

		public Repository ()
		{
			AutoFaker.Configure (builder =>
			{
				builder.WithConventions ();
				builder.WithSkip<CourseCreateRequest> (course => course.InstructorId);
			});

			StudentFaker = new AutoFaker<AccountCreateRequest> ();
			StudentFaker.RuleFor (dto => dto.PasswordHash, fake => fake.Random.Hash (64));
			StudentFaker.RuleFor (dto => dto.AccountRole, fake => Role.Student);

			InstructorFaker = new AutoFaker<AccountCreateRequest> ();
			InstructorFaker.RuleFor (dto => dto.PasswordHash, fake => fake.Random.Hash (64));
			InstructorFaker.RuleFor (dto => dto.AccountRole, fake => Role.Instructor);

			CourseFaker = new AutoFaker<CourseCreateRequest> ();
			CourseFaker.RuleFor (dto => dto.Title, fake => fake.Lorem.Sentence ());
			CourseFaker.RuleFor (dto => dto.Description, fake => fake.Lorem.Paragraph (1));

			ProblemFaker = new AutoFaker<ProblemCreateRequest> ();
			ProblemFaker.RuleFor (dto => dto.Title, fake => fake.Lorem.Sentence ());
			ProblemFaker.RuleFor (dto => dto.Statement, fake => fake.Lorem.Paragraph (1));

			TestCaseFaker = new AutoFaker<TestCaseCreateRequest> ();
			TestCaseFaker.RuleFor (dto => dto.SampleInput, fake => fake.Lorem.Sentence ());
			TestCaseFaker.RuleFor (dto => dto.ExpectedOutput, fake => fake.Lorem.Sentence ());

			TopicFaker = new AutoFaker<TopicCreateRequest> ();
			TopicFaker.RuleFor (dto => dto.Title, fake => fake.Lorem.Sentence ());
			TopicFaker.RuleFor (dto => dto.Description, fake => fake.Lorem.Paragraph (1));

			SolutionFaker = new AutoFaker<SolutionCreateRequest> ();
			SolutionFaker.RuleFor (dto => dto.SourceCode, fake => fake.Lorem.Paragraphs (3));
		}

		public async Task<List<StudentResponse>> GetStudents (int count = 1)
		{
			List<StudentResponse> students = new List<StudentResponse> ();
			for (int i = 0; i < count; i++)
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
				students.Add (studentResponse);
			}
			return students;
		}

		public async Task<List<InstructorResponse>> GetInstructors (int count = 1)
		{
			List<InstructorResponse> instructors = new List<InstructorResponse> ();
			for (int i = 0; i < count; i++)
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
				instructors.Add (instructorResponse);
			}
			return instructors;
		}

		public async Task<List<CourseResponse>> GetCourses (int count = 1)
		{
			var instructor = (await GetInstructors (1)).FirstOrDefault ();
			List<CourseResponse> courses = new List<CourseResponse> ();
			for (int i = 0; i < count; i++)
			{
				var fakeCourse = CourseFaker.Generate ();
				fakeCourse.InstructorId = instructor.Id;
				var response = await Routes.Courses.PostJsonAsync (fakeCourse);
				var courseResponse = await response.GetJsonAsync<CourseResponse> ();
				var courseId = response.GetGuidFromLocation ();
				courses.Add (courseResponse);
			}
			return courses;
		}

		public async Task<CourseAndProblems> GetCourseAndProblems (int count = 1)
		{
			var course = (await GetCourses (1)).FirstOrDefault ();
			List<ProblemResponse> problems = new List<ProblemResponse> ();
			for (int i = 0; i < count; i++)
			{
				var fakeProblem = ProblemFaker.Generate ();
				fakeProblem.AuthorId = course.Instructor.AccountId;
				fakeProblem.CourseIds = new List<System.Guid> ()
				{
					course.Id
				};
				fakeProblem.TestCases = new List<TestCaseCreateRequest> ()
				{
					TestCaseFaker.Generate (),
						TestCaseFaker.Generate ()
				};
				var url = Routes.Problems;
				var response = await url.PostJsonAsync (fakeProblem);
				var problemResponse = await response.GetJsonAsync<ProblemResponse> ();
				problems.Add (problemResponse);
			}
			return new CourseAndProblems () { Course = course, Problems = problems };
		}

		public class CourseAndProblems
		{
			public CourseResponse Course { get; set; }
			public List<ProblemResponse> Problems { get; set; }
		}

	}
}
