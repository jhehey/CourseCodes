using System;
using System.Text;

namespace CourseCodesAPI.Helpers
{
	public static class StringExtensions
	{
		public static string FromBase64ToString (this string encodedString)
		{
			return Encoding.UTF8.GetString (Convert.FromBase64String (encodedString));
		}

		public static string ToBase64String (this string plainText)
		{
			return Convert.ToBase64String (Encoding.UTF8.GetBytes (plainText));
		}
	}
}
