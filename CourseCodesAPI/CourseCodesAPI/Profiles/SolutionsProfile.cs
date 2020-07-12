using AutoMapper;
using CourseCodesAPI.Entities;
using CourseCodesAPI.Models;

namespace CourseCodesAPI.Profiles
{
	public class SolutionsProfile : Profile
	{
		public SolutionsProfile ()
		{
			CreateMap<SolutionCreateRequest, Solution> ();
			CreateMap<SolutionRunRequest, Solution> ()
				.ForMember (dest => dest.Id, opt => opt.MapFrom (src => src.SolutionId));

			CreateMap<Solution, SolutionResponse> ()
				.ForPath (dest => dest.Problem, opt => opt.MapFrom (src => src.CourseProblem.Problem))
				.ForPath (dest => dest.Course, opt => opt.MapFrom (src => src.CourseProblem.Course));
		}

	}
}
