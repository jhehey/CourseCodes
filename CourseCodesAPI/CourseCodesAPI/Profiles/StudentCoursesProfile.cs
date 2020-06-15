using AutoMapper;
using CourseCodesAPI.Entities;
using CourseCodesAPI.Models;

namespace CourseCodesAPI.Profiles
{
	public class StudentCoursesProfile : Profile
	{
		public StudentCoursesProfile ()
		{
			CreateMap<StudentCourse, StudentCourseDto> ();
			CreateMap<StudentCourseForCreationDto, StudentCourse> ();
		}
	}
}
