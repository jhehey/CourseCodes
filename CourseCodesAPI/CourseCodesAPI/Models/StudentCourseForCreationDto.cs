using System;
namespace CourseCodesAPI.Models
{
	public class StudentCourseForCreationDto
	{
		// (StudentId, CourseId) - Composite Primary Key, Add Validation in the entity for this to be unique
		public Guid StudentId { get; set; }
		public Guid CourseId { get; set; }
		public string Code { get; set; }
	}
}
