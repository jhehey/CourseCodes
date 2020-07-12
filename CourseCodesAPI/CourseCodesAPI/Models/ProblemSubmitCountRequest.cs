using System;
using System.Collections.Generic;

namespace CourseCodesAPI.Models
{
	public class ProblemSubmitCountRequest
	{
		public Guid CourseId { get; set; }
		public IEnumerable<Guid> ProblemIds { get; set; }
	}
}
