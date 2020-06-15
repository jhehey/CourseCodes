using AutoMapper;
using CourseCodesAPI.Entities;
using CourseCodesAPI.Models;

namespace CourseCodesAPI.Profiles
{
	public class CoursesProfile : Profile
	{
		public CoursesProfile ()
		{
			CreateMap<Course, CourseDto> ();

			CreateMap<CourseForCreationDto, Course> ();
		}
	}
}
