using MeuMundo.Domain.Interfaces.Repository;
using MeuMundo.Infra.Data.SqlServer.Repositories;
using SimpleInjector;


namespace MeuMundo.Infra.CrossCutting.Ioc
{
    public class ConfigStrapper
    {
        public static void RegisterServices(Container container, Lifestyle lifestyle)
        {
            #region Repositories
            container.Register<IAgendaRepository, AgendaRepository>(lifestyle);
            #endregion
        }
    }
}