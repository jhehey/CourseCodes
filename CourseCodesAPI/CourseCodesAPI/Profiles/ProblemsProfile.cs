using AutoMapper;
using CourseCodesAPI.Entities;
using CourseCodesAPI.Models;

namespace CourseCodesAPI.Profiles
{
	public class ProblemsProfile : Profile
	{
		public ProblemsProfile ()
		{
			CreateMap<ProblemCreateRequest, Problem> ();

			CreateMap<Problem, ProblemResponse> ();
		}
	}
}
