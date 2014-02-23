using DotNetNuke.Web.Api;

namespace DnnMobiHelper
{
    public class RouteMapper : IServiceRouteMapper
    {
        public void RegisterRoutes(IMapRoute mapRouteManager)
        {
            mapRouteManager.MapHttpRoute("DnnMobiHelper", "default", "{controller}/{action}", new[] { "DnnMobiHelper" });
        }
    }
}
