using CourseCodesAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace CourseCodesAPI.Contexts
{
	public class CourseCodesContext : DbContext
	{
		public CourseCodesContext (DbContextOptions<CourseCodesContext> options) : base (options) { }

		// TODO: Add DbSets
		public DbSet<Student> Students { get; set; }
		public DbSet<Instructor> Instructors { get; set; }
		public DbSet<Course> Courses { get; set; }
		public DbSet<StudentCourse> StudentCourses { get; set; }
		public DbSet<JoinCode> JoinCodes { get; set; }

		protected override void OnModelCreating (ModelBuilder builder)
		{
			// Student
			// Primary Key
			builder.Entity<Student> ()
				.HasKey (s => s.Id);
			// a Student owns an Account
			builder.Entity<Student> ()
				.HasOne (s => s.Account);

			// Instructor
			// Primary Key
			builder.Entity<Instructor> ()
				.HasKey (i => i.Id);
			// an Instructor owns an Account
			builder.Entity<Instructor> ()
				.HasOne (i => i.Account);

			// Course
			// Primary Key
			builder.Entity<Course> ()
				.HasKey (c => c.Id);
			// 1 (Instructor) to many (Course)
			builder.Entity<Course> ()
				.HasOne (c => c.Instructor)
				.WithMany (i => i.Courses)
				.HasForeignKey (c => c.InstructorId);

			// StudentCourse (join entity)
			// Composite Key
			builder.Entity<StudentCourse> ()
				.HasKey (sc => new { sc.StudentId, sc.CourseId });
			builder.Entity<StudentCourse> ()
				.HasOne (sc => sc.Student)
				.WithMany (s => s.StudentCourses)
				.HasForeignKey (sc => sc.StudentId);
			builder.Entity<StudentCourse> ()
				.HasOne (sc => sc.Course)
				.WithMany (c => c.StudentCourses)
				.HasForeignKey (sc => sc.CourseId);

			// JoinCode
			// Primary Key
			builder.Entity<JoinCode> ()
				.HasKey (jc => jc.Id);
			// (1 to 1)
			builder.Entity<JoinCode> ()
				.HasOne (jc => jc.Course)
				.WithOne (c => c.JoinCode)
				.HasForeignKey<JoinCode> (jc => jc.CourseId);
		}
	}
}
