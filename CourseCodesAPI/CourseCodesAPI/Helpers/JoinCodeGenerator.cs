using System;
using System.Linq;

namespace CourseCodesAPI.Helpers
{
	public static class JoinCodeGenerator
	{
		private const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

		public static string Generate (int length)
		{
			Random random = new Random ();
			return new String (Enumerable.Range (1, length)
				.Select (a => chars[random.Next (chars.Length)])
				.ToArray ());
		}
	}
}
