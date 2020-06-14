using Microsoft.EntityFrameworkCore;

namespace CourseCodesAPI.Contexts
{
	public class CourseCodesContext : DbContext
	{
		public CourseCodesContext (DbContextOptions<CourseCodesContext> options) : base (options) { }

		// TODO: Add DbSets
	}
}
