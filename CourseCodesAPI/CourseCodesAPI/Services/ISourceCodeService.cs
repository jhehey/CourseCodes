using System.IO;
using System.Threading.Tasks;
using CourseCodesAPI.Services.RemoteCodeExecution;

namespace CourseCodesAPI.Services
{
	public interface ISourceCodeService
	{
		DirectoryInfo CreateSubdirectory (string directory);
		Task<SourceCodeInfo> SaveSourceCode (string sourceCode, string baseDirectory, string extension = "cpp");
	}
}
