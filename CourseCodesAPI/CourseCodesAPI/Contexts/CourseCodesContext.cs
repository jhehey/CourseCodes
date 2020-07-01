using System.Threading.Tasks;
using CourseCodesAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace CourseCodesAPI.Contexts
{
	public class CourseCodesContext : DbContext
	{
		public CourseCodesContext (DbContextOptions<CourseCodesContext> options) : base (options) { }

		// TODO: Add DbSets
		public DbSet<Account> Accounts { get; set; }
		public DbSet<Student> Students { get; set; }
		public DbSet<Instructor> Instructors { get; set; }
		public DbSet<Course> Courses { get; set; }
		public DbSet<StudentCourse> StudentCourses { get; set; }
		public DbSet<JoinCode> JoinCodes { get; set; }
		public DbSet<Topic> Topics { get; set; }

		private void BuildAccount (ModelBuilder builder)
		{
			// Primary Key
			builder.Entity<Account> ()
				.HasKey (a => a.Id);

			// Properties
			builder.Entity<Account> ()
				.Property (a => a.FirstName).IsRequired ().HasMaxLength (50);
			builder.Entity<Account> ()
				.Property (a => a.LastName).IsRequired ().HasMaxLength (50);
			builder.Entity<Account> ()
				.Property (a => a.Email).IsRequired ().HasMaxLength (255);
			builder.Entity<Account> ()
				.Property (a => a.PasswordHash).IsRequired ().HasMaxLength (100);
		}

		private void BuildInstructor (ModelBuilder builder)
		{
			// Primary Key
			builder.Entity<Instructor> ()
				.HasKey (i => i.Id);

			// Account - Instructor (1 to 1)
			builder.Entity<Instructor> ()
				.HasOne (i => i.Account)
				.WithOne (a => a.Instructor)
				.HasForeignKey<Instructor> (i => i.AccountId);
		}

		private void BuildStudent (ModelBuilder builder)
		{
			// Primary Key
			builder.Entity<Student> ()
				.HasKey (s => s.Id);

			// Account - Student (1 to 1)
			builder.Entity<Student> ()
				.HasOne (s => s.Account)
				.WithOne (a => a.Student)
				.HasForeignKey<Student> (s => s.AccountId);
		}

		private void BuildCourse (ModelBuilder builder)
		{
			// Primary Key
			builder.Entity<Course> ()
				.HasKey (c => c.Id);

			// Properties
			builder.Entity<Course> ()
				.Property (c => c.Title).IsRequired ().HasMaxLength (100);
			builder.Entity<Course> ()
				.Property (c => c.Description).IsRequired ().HasMaxLength (500);
			builder.Entity<Course> ()
				.Property (c => c.InstructorId).IsRequired ();

			// Instructor - Course (1 to many)
			builder.Entity<Course> ()
				.HasOne (c => c.Instructor)
				.WithMany (i => i.Courses)
				.HasForeignKey (c => c.InstructorId);
		}

		private void BuildStudentCourse (ModelBuilder builder)
		{
			// Join Entity Composite Key
			builder.Entity<StudentCourse> ()
				.HasKey (sc => new { sc.StudentId, sc.CourseId });

			// Properties
			builder.Entity<StudentCourse> ()
				.Property (sc => sc.StudentId).IsRequired ();
			builder.Entity<StudentCourse> ()
				.Property (sc => sc.CourseId).IsRequired ();

			// Student - StudentCourse (1 to many)
			builder.Entity<StudentCourse> ()
				.HasOne (sc => sc.Student)
				.WithMany (s => s.StudentCourses)
				.HasForeignKey (sc => sc.StudentId);

			// Course - StudentCourse (1 to many)
			builder.Entity<StudentCourse> ()
				.HasOne (sc => sc.Course)
				.WithMany (c => c.StudentCourses)
				.HasForeignKey (sc => sc.CourseId);
		}

		private void BuildJoinCode (ModelBuilder builder)
		{
			// Primary Key
			builder.Entity<JoinCode> ()
				.HasKey (jc => jc.Id);

			// Properties
			builder.Entity<JoinCode> ()
				.Property (jc => jc.Code).HasMaxLength (6);
			builder.Entity<JoinCode> ()
				.Property (jc => jc.PasswordHash).HasMaxLength (100);

			// Course - JoinCode (1 to 1)
			builder.Entity<JoinCode> ()
				.HasOne (jc => jc.Course)
				.WithOne (c => c.JoinCode)
				.HasForeignKey<JoinCode> (jc => jc.CourseId);
		}

		private void BuildProblem (ModelBuilder builder)
		{
			// Primary Key
			builder.Entity<Problem> ()
				.HasKey (p => p.Id);

			// Properties
			builder.Entity<Problem> ()
				.Property (p => p.Title).IsRequired ().HasMaxLength (100);
			builder.Entity<Problem> ()
				.Property (p => p.Statement).IsRequired ().HasColumnType ("text");

			// Account - Problem (1 to many)
			builder.Entity<Problem> ()
				.HasOne (p => p.Author)
				.WithMany (a => a.Problems)
				.HasForeignKey (p => p.AuthorId);
		}

		private void BuildCourseProblem (ModelBuilder builder)
		{
			// Join Entity Composite Key
			builder.Entity<CourseProblem> ()
				.HasKey (cp => new { cp.CourseId, cp.ProblemId });

			// Course - CourseProblem (1 to many)
			builder.Entity<CourseProblem> ()
				.HasOne (cp => cp.Course)
				.WithMany (c => c.CourseProblems)
				.HasForeignKey (cp => cp.CourseId);

			// Problem - CourseProblem (1 to many)
			builder.Entity<CourseProblem> ()
				.HasOne (cp => cp.Problem)
				.WithMany (p => p.CourseProblems)
				.HasForeignKey (cp => cp.ProblemId);
		}

		private void BuildTestCase (ModelBuilder builder)
		{
			// Primary Key
			builder.Entity<TestCase> ()
				.HasKey (t => t.Id);

			// Properties
			builder.Entity<TestCase> ()
				.Property (t => t.SampleInput).IsRequired ().HasColumnType ("text");
			builder.Entity<TestCase> ()
				.Property (t => t.ExpectedOutput).IsRequired ().HasColumnType ("text");

			// Problem - TestCase (1 to many)
			builder.Entity<TestCase> ()
				.HasOne (t => t.Problem)
				.WithMany (p => p.TestCases)
				.HasForeignKey (t => t.ProblemId);
		}

		private void BuildSolution (ModelBuilder builder)
		{
			// Primary Key
			builder.Entity<Solution> ()
				.HasKey (s => s.Id);

			// Properties
			builder.Entity<Solution> ()
				.Property (s => s.SourceCode).IsRequired ().HasColumnType ("text");

			// Student - Solution (1 to many)
			builder.Entity<Solution> ()
				.HasOne (s => s.Student)
				.WithMany (s => s.Solutions)
				.HasForeignKey (s => s.StudentId);

			// Problem - Solution (1 to many)
			builder.Entity<Solution> ()
				.HasOne (s => s.Problem)
				.WithMany (p => p.Solutions)
				.HasForeignKey (s => s.ProblemId);
		}

		private void BuildTopic (ModelBuilder builder)
		{
			// Primary Key
			builder.Entity<Topic> ()
				.HasKey (t => t.Id);

			// Properties
			builder.Entity<Topic> ()
				.Property (t => t.Title).IsRequired ().HasMaxLength (100);
			builder.Entity<Topic> ()
				.Property (t => t.Description).HasMaxLength (500);

			// Course - Topic (1 to many)
			builder.Entity<Topic> ()
				.HasOne (t => t.Course)
				.WithMany (c => c.Topics)
				.HasForeignKey (t => t.CourseId);
		}

		private void BuildTopicProblem (ModelBuilder builder)
		{
			// Join Entity Composite Key
			builder.Entity<TopicProblem> ()
				.HasKey (tp => new { tp.TopicId, tp.ProblemId });

			// Topic - TopicProblem (1 to many)
			builder.Entity<TopicProblem> ()
				.HasOne (tp => tp.Topic)
				.WithMany (t => t.TopicProblems)
				.HasForeignKey (tp => tp.TopicId);

			// Problem - TopicProblem (1 to many)
			builder.Entity<TopicProblem> ()
				.HasOne (tp => tp.Problem)
				.WithMany (p => p.TopicProblems)
				.HasForeignKey (tp => tp.ProblemId);
		}

		protected override void OnModelCreating (ModelBuilder builder)
		{
			BuildAccount (builder);
			BuildInstructor (builder);
			BuildStudent (builder);
			BuildCourse (builder);
			BuildStudentCourse (builder);
			BuildJoinCode (builder);
			BuildProblem (builder);
			BuildCourseProblem (builder);
			BuildTestCase (builder);
			BuildSolution (builder);
			BuildTopic (builder);
			BuildTopicProblem (builder);
		}
	}
}
