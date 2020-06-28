using System;

namespace CourseCodesAPI.Entities
{
	public class Topic
	{
		public Guid Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }

		// A Topic belongs to a Course
		public Guid CourseId { get; set; }
		public Course Course { get; set; }
	}
}
