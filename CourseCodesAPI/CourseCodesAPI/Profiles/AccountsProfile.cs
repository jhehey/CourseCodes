using AutoMapper;
using CourseCodesAPI.Entities;
using CourseCodesAPI.Models;

namespace CourseCodesAPI.Profiles
{
	public class AccountsProfile : Profile
	{
		public AccountsProfile ()
		{
			CreateMap<AccountCreateRequest, Account> ();

			CreateMap<Account, AccountResponse> ()
				.ForMember (dest => dest.FullName, opt => opt.MapFrom (src => $"{src.FirstName} {src.LastName}"));

			CreateMap<Account, StudentResponse> ()
				.ForMember (dest => dest.AccountId, opt => opt.MapFrom (src => src.Id))
				.ForMember (dest => dest.Id, opt => opt.MapFrom (src => src.Student.Id))
				.ForMember (dest => dest.FullName, opt => opt.MapFrom (src => $"{src.FirstName} {src.LastName}"))
				.ForMember (dest => dest.Email, opt => opt.MapFrom (src => src.Email))
				.ForMember (dest => dest.DateRegistered, opt => opt.MapFrom (src => src.DateRegistered))
				.ForMember (dest => dest.AccountRole, opt => opt.MapFrom (src => src.AccountRole));

			CreateMap<Account, InstructorResponse> ()
				.ForMember (dest => dest.AccountId, opt => opt.MapFrom (src => src.Id))
				.ForMember (dest => dest.Id, opt => opt.MapFrom (src => src.Instructor.Id))
				.ForMember (dest => dest.FullName, opt => opt.MapFrom (src => $"{src.FirstName} {src.LastName}"))
				.ForMember (dest => dest.Email, opt => opt.MapFrom (src => src.Email))
				.ForMember (dest => dest.DateRegistered, opt => opt.MapFrom (src => src.DateRegistered))
				.ForMember (dest => dest.AccountRole, opt => opt.MapFrom (src => src.AccountRole));
		}
	}
}
