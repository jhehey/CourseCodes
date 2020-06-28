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

		protected override void OnModelCreating (ModelBuilder builder)
		{
			// Account
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
			// Properties
			builder.Entity<Course> ()
				.Property (c => c.Title).IsRequired ().HasMaxLength (100);
			builder.Entity<Course> ()
				.Property (c => c.Description).IsRequired ().HasMaxLength (500);
			builder.Entity<Course> ()
				.Property (c => c.InstructorId).IsRequired ();

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
			// Properties
			builder.Entity<StudentCourse> ()
				.Property (sc => sc.StudentId).IsRequired ();
			builder.Entity<StudentCourse> ()
				.Property (sc => sc.CourseId).IsRequired ();

			// JoinCode
			// Primary Key
			builder.Entity<JoinCode> ()
				.HasKey (jc => jc.Id);
			// (1 to 1)
			builder.Entity<JoinCode> ()
				.HasOne (jc => jc.Course)
				.WithOne (c => c.JoinCode)
				.HasForeignKey<JoinCode> (jc => jc.CourseId);
			// Properties
			builder.Entity<JoinCode> ()
				.Property (jc => jc.Code).HasMaxLength (6);
			builder.Entity<JoinCode> ()
				.Property (jc => jc.PasswordHash).HasMaxLength (100);

			// Topic
			// Primary Key
			builder.Entity<Topic> ()
				.HasKey (t => t.Id);
			builder.Entity<Topic> ()
				.HasOne (t => t.Course)
				.WithMany (c => c.Topics)
				.HasForeignKey (t => t.CourseId);
			// Properties
			builder.Entity<Topic> ()
				.Property (t => t.Title).IsRequired ().HasMaxLength (100);
			builder.Entity<Topic> ()
				.Property (t => t.Description).HasMaxLength (500);

		}
	}
}
