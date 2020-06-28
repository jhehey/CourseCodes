using AutoMapper;
using CourseCodesAPI.Entities;
using CourseCodesAPI.Models;

namespace CourseCodesAPI.Profiles
{
	public class TopicsProfile : Profile
	{
		public TopicsProfile ()
		{
			CreateMap<Topic, TopicDto> ();

			CreateMap<TopicForCreationDto, Topic> ();
		}
	}
}
