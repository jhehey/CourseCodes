using System.Linq;
using AutoMapper;
using CourseCodesAPI.Entities;
using CourseCodesAPI.Models;

namespace CourseCodesAPI.Profiles
{
	public class CoursesProfile : Profile
	{
		public CoursesProfile ()
		{
			CreateMap<CourseCreateRequest, Course> ();

			CreateMap<Course, CourseResponse> ();

			CreateMap<StudentCourse, CourseResponse> ()
				.ForPath (dest => dest.Id, opt => opt.MapFrom (src => src.Course.Id))
				.ForPath (dest => dest.CourseName, opt => opt.MapFrom (src => src.Course.CourseName))
				.ForPath (dest => dest.Term, opt => opt.MapFrom (src => src.Course.Term))
				.ForPath (dest => dest.Section, opt => opt.MapFrom (src => src.Course.Section))
				.ForPath (dest => dest.Capacity, opt => opt.MapFrom (src => src.Course.Capacity))
				.ForPath (dest => dest.DateCreated, opt => opt.MapFrom (src => src.Course.DateCreated))
				.ForPath (dest => dest.Instructor, opt => opt.MapFrom (src => src.Course.Instructor))
				.ForPath (dest => dest.DateJoined, opt => opt.MapFrom (src => src.DateJoined));
		}
	}
}
