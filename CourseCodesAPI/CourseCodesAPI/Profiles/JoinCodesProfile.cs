using AutoMapper;
using CourseCodesAPI.Entities;
using CourseCodesAPI.Models;

namespace CourseCodesAPI.Profiles
{
	public class JoinCodesProfile : Profile
	{
		public JoinCodesProfile ()
		{
			CreateMap<JoinCode, JoinCodeDto> ();

		}
	}
}
