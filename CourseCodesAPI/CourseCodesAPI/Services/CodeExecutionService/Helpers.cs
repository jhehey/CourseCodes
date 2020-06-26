using System;
using System.Linq;
using System.Security.Cryptography;

namespace CourseCodesAPI.Services.CodeExecutionService
{
	public static class Helpers
	{
		public static string RandomId (int length)
		{
			const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
			return new string (Enumerable.Range (1, length).Select (_ => chars[RandomNumberGenerator.GetInt32 (chars.Length)]).ToArray ());
		}
	}
}
