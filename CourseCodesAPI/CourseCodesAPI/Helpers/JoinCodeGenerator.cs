using System;
using System.Linq;
using System.Security.Cryptography;

namespace CourseCodesAPI.Helpers
{
	public static class JoinCodeGenerator
	{
		private const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

		public static string Generate (int length)
		{
			return new string (Enumerable.Range (1, length).Select (_ => chars[RandomNumberGenerator.GetInt32 (chars.Length)]).ToArray ());
		}
	}
}
