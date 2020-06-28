using System;
using Flurl;

namespace CourseCodesAPI.Tests.Helpers
{
	public static class Routes
	{
		public static string baseUrl = "https://localhost:5001/api";

		public static string Accounts = $"{baseUrl}/accounts";
		public static string Students = $"{baseUrl}/students";
		public static string Instructors = $"{baseUrl}/instructors";
		public static string Courses = $"{baseUrl}/courses";
		public static string JoinCodes = $"{baseUrl}/joincodes";

		public static string Topics (this string baseUrl)
		{
			return Url.Combine (baseUrl, "/topics");
		}
	}
}
