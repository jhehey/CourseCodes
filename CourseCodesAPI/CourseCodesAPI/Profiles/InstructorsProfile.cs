using AutoMapper;
using CourseCodesAPI.Entities;
using CourseCodesAPI.Models;

namespace CourseCodesAPI.Profiles
{
	public class InstructorsProfile : Profile
	{
		public InstructorsProfile ()
		{
			CreateMap<Instructor, InstructorResponse> ()
				.ForMember (dest => dest.FullName, opt => opt.MapFrom (src => $"{src.Account.FirstName} {src.Account.LastName}"))
				.ForMember (dest => dest.Email, opt => opt.MapFrom (src => src.Account.Email))
				.ForMember (dest => dest.DateRegistered, opt => opt.MapFrom (src => src.Account.DateRegistered))
				.ForMember (dest => dest.AccountRole, opt => opt.MapFrom (src => src.Account.AccountRole));
		}
	}
}
