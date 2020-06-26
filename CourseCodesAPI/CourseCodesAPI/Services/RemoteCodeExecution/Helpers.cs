using System;
using System.Linq;

namespace CourseCodesAPI.Services.RemoteCodeExecution
{
	public static class Helpers
	{
		public static string RandomId (int length = 6)
		{
			Random random = new Random (DateTime.Now.Millisecond);
			const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
			return new string (Enumerable.Range (1, length).Select (_ => chars[random.Next (chars.Length)]).ToArray ());
		}
	}
}
