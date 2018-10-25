using System.Web;
using System.Web.Optimization;

namespace MeuMundo.Presentation.MeuMundoWeb
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            #region Bundle CSS

            bundles.Add(new StyleBundle("~/Content/css").Include(
                   "~/Content/bootstrap.css",
                   "~/Content/site.css",
                   "~/Content/Styles/View/Common.css"
                   ));

            bundles.Add(new StyleBundle("~/bundles/agenda/index-css").Include(
            "~/Content/Styles/View/Agenda/index.css"));

            bundles.Add(new StyleBundle("~/bundles/agenda/lista-css").Include(
             "~/Content/Styles/View/Agenda/lista.css"));

            bundles.Add(new StyleBundle("~/bundles/agenda/form-css").Include(
       "~/Content/Styles/View/Agenda/form.css"));

            #endregion

            #region Bundle JS

            bundles.Add(new ScriptBundle("~/bundles/Scripts/site").Include(
               "~/Scripts/View/Common.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/agenda/lista-js").Include(
              "~/Scripts/View/Agenda/Lista.js"));

            bundles.Add(new ScriptBundle("~/bundles/agenda/novo-js").Include(
              "~/Scripts/View/Agenda/Form.js",
              "~/Scripts/View/Agenda/Novo.js"));

            bundles.Add(new ScriptBundle("~/bundles/agenda/editar-js").Include(
           "~/Scripts/View/Agenda/Form.js",
           "~/Scripts/View/Agenda/Editar.js"));

            #endregion


        }
    }
}
