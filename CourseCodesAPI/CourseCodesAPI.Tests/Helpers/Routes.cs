using System;
namespace CourseCodesAPI.Tests.Helpers
{
	public static class Routes
	{
		public static string baseUrl = "https://localhost:5001/api";

		public static string Students = $"{baseUrl}/students";
		public static string Instructors = $"{baseUrl}/instructors";
		public static string Courses = $"{baseUrl}/courses";
		public static string JoinCodes = $"{baseUrl}/joincodes";
	}
}
