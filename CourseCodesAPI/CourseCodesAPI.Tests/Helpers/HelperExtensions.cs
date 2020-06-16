using System;
using System.ComponentModel;
using System.Linq;
using System.Net.Http;
using System.Net.Mime;
using System.Text.Json;
using System.Threading.Tasks;
using FluentAssertions;
using FluentAssertions.Primitives;
using Flurl;

namespace CourseCodesAPI.Tests.Helpers
{
	public static class HelperExtensions
	{
		public static async Task<T> GetJsonAsync<T> (this HttpResponseMessage response)
		{
			var jsonStream = await response.Content.ReadAsStreamAsync ();
			var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
			var result = await JsonSerializer.DeserializeAsync<T> (jsonStream, options);
			return result;
		}

		public static Guid GetGuidFromLocation (this HttpResponseMessage response)
		{
			return new Guid (response.Headers.Location.Segments.LastOrDefault ());
		}

		public static AndConstraint<StringAssertions> ShouldBeContentTypeJson (this HttpResponseMessage response)
		{
			return response.Content.Headers.ContentType.MediaType.Should ().Be (MediaTypeNames.Application.Json);
		}

		public static string Slash (this string urlBase, string param)
		{
			return Url.Combine (urlBase, param);
		}

		public static string Slash (this string urlBase, Guid guid)
		{
			return Url.Combine (urlBase, guid.ToString ());
		}

	}
}
