using System.Web;
using System.Web.Mvc;

namespace MeuMundo.Presentation.MeuMundoWeb
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
