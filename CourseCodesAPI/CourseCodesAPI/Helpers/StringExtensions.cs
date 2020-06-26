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
	}
}
