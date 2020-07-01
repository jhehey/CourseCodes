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

			CreateMap<Solution, SolutionResponse> ();
		}

	}
}
