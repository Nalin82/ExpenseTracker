using NJsonSchema.CodeGeneration.TypeScript;
using NSwag;
using NSwag.CodeGeneration.TypeScript;
using System;
using System.IO;
using System.Threading.Tasks;
namespace APIClientGenerator
{
    class Program
    {
        static async Task Main(string[] args)
        {
            if (args.Length != 2)
                throw new ArgumentException("Expecting 2 arguments: URL, generatePath");

            var url = args[0];
            var generatePath = Path.Combine(Directory.GetCurrentDirectory(), args[1]);

            await GenerateTypeScriptClient(url, generatePath);
        }

        async static Task GenerateTypeScriptClient(string url, string generatePath) =>
            await GenerateClient(
                document: await OpenApiDocument.FromUrlAsync(url),
                generatePath: generatePath,
                generateCode: (OpenApiDocument document) =>
                {
                    var settings = new TypeScriptClientGeneratorSettings();

                    settings.TypeScriptGeneratorSettings.TypeStyle = TypeScriptTypeStyle.Interface;
                    settings.TypeScriptGeneratorSettings.TypeScriptVersion = 3.5M;
                    settings.TypeScriptGeneratorSettings.DateTimeType = TypeScriptDateTimeType.String;
                    settings.Template = TypeScriptTemplate.Angular;
                    settings.InjectionTokenType = InjectionTokenType.InjectionToken;
                    settings.HttpClass = HttpClass.HttpClient;
                    settings.BaseUrlTokenName = "API_BASE_URL";
                    settings.ClientBaseClass = "ApiBase";
                    settings.UseTransformOptionsMethod = true;
                    settings.ExceptionClass = "ApiException";
                    settings.TypeScriptGeneratorSettings.ExtensionCode = "import { ApiBase } from './apibase';";

                    var generator = new TypeScriptClientGenerator(document, settings);
                    var code = generator.GenerateFile();

                    return code;
                }
            );

        private async static Task GenerateClient(OpenApiDocument document, string generatePath, Func<OpenApiDocument, string> generateCode)
        {
            Console.WriteLine($"Generating {generatePath}...");

            var code = generateCode(document);

            await System.IO.File.WriteAllTextAsync(generatePath, code);
        }
    }
}
