using AutoMapper;
using CourseCodesAPI.Entities;
using CourseCodesAPI.Models;
using CourseCodesAPI.Services.CodeExecutionService.Models;

namespace CourseCodesAPI.Profiles
{
	public class TestCasesProfile : Profile
	{
		public TestCasesProfile ()
		{
			CreateMap<TestCaseCreateRequest, TestCase> ();

			CreateMap<TestCase, TestCaseResponse> ();

			// Entity -> Service/Model
			CreateMap<TestCase, TestCaseRequest> ();
		}
	}
}
