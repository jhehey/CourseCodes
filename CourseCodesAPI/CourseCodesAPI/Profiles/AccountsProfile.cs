using AutoMapper;
using CourseCodesAPI.Entities;
using CourseCodesAPI.Models;

namespace CourseCodesAPI.Profiles
{
	public class AccountsProfile : Profile
	{
		public AccountsProfile ()
		{
			CreateMap<Account, AccountDto> ()
				.ForMember (dest => dest.FullName, opt =>
					opt.MapFrom (src => $"{src.FirstName} {src.LastName}"));

			CreateMap<AccountForSignInDto, Account> ();
		}
	}
}
