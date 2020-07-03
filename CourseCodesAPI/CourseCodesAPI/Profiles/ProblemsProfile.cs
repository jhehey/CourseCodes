using System.Linq;
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

			CreateMap<Problem, ProblemResponse> ()
				.ForPath (dest => dest.Courses, opt => opt.MapFrom (src => src.CourseProblems.Select (cp => cp.Course)));
		}
	}
}
