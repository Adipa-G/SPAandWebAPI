using System.IO;
using System.Text.Json.Serialization;
using Infrastructure.Converters;
using Infrastructure.Logging;
using Infrastructure.Modules;
using Infrastructure.Plumbing;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using Web.Middleware;
using Web.Modules;

namespace Web;

public class Startup(IConfiguration configuration)
{
    public IConfiguration Configuration { get; } = configuration;
    public PathProvider PathProvider { get; } = new(Directory.GetCurrentDirectory());

    public void ConfigureServices(IServiceCollection services)
    {
        PlumbingModule.Load(services, Configuration);
        RepositoryModule.Load(services);
        DbContextModule.Load(services, Configuration);
        IdentityModule.Load(services);

        services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            options.JsonSerializerOptions.Converters.Add(new IntNullableEnumConverter<Domain.Enum.LogLevel?>());
        });
        
        services.AddLogging(loggingBuilder =>
        {
            loggingBuilder.AddConsole(c => c.LogToStandardErrorThreshold = LogLevel.Information);
            loggingBuilder.AddDbLogger();
        });
    }

    public void Configure(IApplicationBuilder app)
    {
        var fileProvider = new PhysicalFileProvider(Path.Combine(PathProvider.HostingDirectory, "app"));
        var defoptions = new DefaultFilesOptions();
        defoptions.DefaultFileNames.Clear();
        defoptions.FileProvider = fileProvider;
        defoptions.DefaultFileNames.Add("index.html");

        app.UseDefaultFiles(defoptions)
            .UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = fileProvider,
                RequestPath = new PathString("")
            })
            .UseDeveloperExceptionPage();

        app.UseMiddleware<ValidateAntiForgeryToken>();
        app.UseMiddleware<RequestResponseLog>();

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapDefaultControllerRoute();
        });
    }
}
