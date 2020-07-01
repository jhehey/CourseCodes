using AutoMapper;
using CourseCodesAPI.Entities;
using CourseCodesAPI.Models;

namespace CourseCodesAPI.Profiles
{
	public class TopicsProfile : Profile
	{
		public TopicsProfile ()
		{
			CreateMap<TopicCreateRequest, Topic> ();

			CreateMap<Topic, TopicResponse> ();
		}
	}
}
