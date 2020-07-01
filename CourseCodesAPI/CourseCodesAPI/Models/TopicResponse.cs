using System;
using System.Collections.Generic;

namespace CourseCodesAPI.Models
{
	public class TopicResponse
	{
		public Guid Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }

		public CourseResponse Course { get; set; }
		public List<ProblemResponse> Problems { get; set; }
	}
}
