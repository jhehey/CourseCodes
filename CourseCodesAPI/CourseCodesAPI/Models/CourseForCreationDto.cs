using System;
namespace CourseCodesAPI.Models
{
	public class CourseForCreationDto
	{
		// TODO: Validate Not Null, and Instructor w/ Id Exists
		public Guid InstructorId { get; set; }

		// TODO: Validate unique course title per instructor (UniqueKey: InstructorId && Title)
		public string Title { get; set; }
		public string Description { get; set; }
	}
}
