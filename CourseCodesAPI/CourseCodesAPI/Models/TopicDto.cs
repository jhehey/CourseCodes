using System;

namespace CourseCodesAPI.Models
{
	public class TopicDto
	{
		public Guid Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public CourseDto Course { get; set; }
		// TODO: include list of problems here
	}
}
