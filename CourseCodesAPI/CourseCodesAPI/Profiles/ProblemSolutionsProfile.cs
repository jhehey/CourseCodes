using System.Linq;
using AutoMapper;
using CourseCodesAPI.Helpers;
using CourseCodesAPI.Models;

namespace CourseCodesAPI.Profiles
{
	public class ProblemSolutionsProfile : Profile
	{
		public ProblemSolutionsProfile ()
		{
			CreateMap<ProblemSolutionForTransferDto, ProblemSolutionForExecutionDto> ()
				.ForMember (dest => dest.SourceCode, opt => opt.MapFrom (src => src.EncodedSourceCode.FromBase64ToString ()))
				.ForMember (dest => dest.InputList, opt => opt.MapFrom (src => src.TestCases.Select (x => x.SampleInput).ToList ()));
		}
	}
}
