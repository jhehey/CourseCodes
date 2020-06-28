using AutoMapper;
using CourseCodesAPI.Entities;
using CourseCodesAPI.Models;

namespace CourseCodesAPI.Profiles
{
	public class InstructorsProfile : Profile
	{
		public InstructorsProfile ()
		{
			CreateMap<Instructor, InstructorDto> ()
				.ForMember (dest => dest.FullName, opt => opt.MapFrom (src => $"{src.Account.FirstName} {src.Account.LastName}"))
				.ForMember (dest => dest.Email, opt => opt.MapFrom (src => src.Account.Email))
				.ForMember (dest => dest.DateRegistered, opt => opt.MapFrom (src => src.Account.DateRegistered))
				.ForMember (dest => dest.AccountRole, opt => opt.MapFrom (src => src.Account.AccountRole));

			CreateMap<InstructorForCreationDto, Instructor> ()
				.ForPath (dest => dest.Account.FirstName, opt => opt.MapFrom (src => src.FirstName))
				.ForPath (dest => dest.Account.LastName, opt => opt.MapFrom (src => src.LastName))
				.ForPath (dest => dest.Account.Email, opt => opt.MapFrom (src => src.Email))
				.ForPath (dest => dest.Account.PasswordHash, opt => opt.MapFrom (src => src.PasswordHash))
				.ForPath (dest => dest.Account.AccountRole, opt => opt.MapFrom (src => src.AccountRole));
		}
	}
}
