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

			CreateMap<Problem, ProblemResponse> ();
			// .ForPath (dest => dest.CourseProblemId, opt => opt.MapFrom (src => src.CourseProblems.FirstOrDefault ().Id));
			// .ForPath (dest => dest.Courses, opt => opt.MapFrom (src => src.CourseProblems.Select (cp => cp.Course)));

			CreateMap<CourseProblem, ProblemResponse> ()
				.ForPath (dest => dest.Id, opt => opt.MapFrom (src => src.Problem.Id))
				.ForPath (dest => dest.Title, opt => opt.MapFrom (src => src.Problem.Title))
				.ForPath (dest => dest.Statement, opt => opt.MapFrom (src => src.Problem.Statement))
				.ForPath (dest => dest.Author, opt => opt.MapFrom (src => src.Problem.Author))
				.ForPath (dest => dest.TestCases, opt => opt.MapFrom (src => src.Problem.TestCases))
				.ForPath (dest => dest.CourseProblemId, opt => opt.MapFrom (src => src.Id));

		}
	}
}
