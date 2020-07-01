using AutoMapper;
using CourseCodesAPI.Entities;
using CourseCodesAPI.Models;

namespace CourseCodesAPI.Profiles
{
	public class TestCasesProfile : Profile
	{
		public TestCasesProfile ()
		{
			CreateMap<TestCaseCreateRequest, TestCase> ();

			CreateMap<TestCase, TestCaseResponse> ();
		}
	}
}
