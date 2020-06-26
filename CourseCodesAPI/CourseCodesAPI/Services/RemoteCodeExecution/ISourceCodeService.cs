using System.IO;
using System.Threading.Tasks;

namespace CourseCodesAPI.Services.RemoteCodeExecution
{
	public interface ISourceCodeService
	{
		DirectoryInfo CreateSubdirectory (string directory);
		Task<SourceCodeInfo> SaveSourceCode (string sourceCode, string baseDirectory, string extension = "cpp");
	}
}
