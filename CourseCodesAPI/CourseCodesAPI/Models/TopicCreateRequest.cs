using System;
using System.Collections.Generic;

namespace CourseCodesAPI.Models
{
	public class TopicCreateRequest
	{
		public string Title { get; set; }
		public string Description { get; set; }
		public List<Guid> ProblemIds { get; set; } = new List<Guid> ();
	}
}
