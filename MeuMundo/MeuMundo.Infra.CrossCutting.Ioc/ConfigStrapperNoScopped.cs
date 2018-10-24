using MeuMundo.Domain.Interfaces.Repository;
using MeuMundo.Infra.Data.SqlServer.Repositories;
using SimpleInjector;

namespace MeuMundo.Infra.CrossCutting.Ioc
{
    public class ConfigStrapperNoScopped
    {
        public static void RegisterServices(Container container)
        {
            #region Repositories
            container.Register<IAgendaRepository, AgendaRepository>();
            #endregion
        }
    }
}
