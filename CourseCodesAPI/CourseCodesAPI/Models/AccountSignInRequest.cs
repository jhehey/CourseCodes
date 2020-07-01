namespace CourseCodesAPI.Models
{
	public class AccountSignInRequest
	{
		public string Email { get; set; }
		public string PasswordHash { get; set; }
	}
}
