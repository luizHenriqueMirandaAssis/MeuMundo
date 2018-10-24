using SimpleInjector;

namespace MeuMundo.Infra.CrossCutting.Ioc
{
    public static class IoCNoScoppedFactory
    {
        private static Container _container;

        public static Container GetContainer()
        {
            if (_container == null)
            {
                _container = new Container();
                InitializeContainer(_container);
            }

            return _container;
        }

        private static void InitializeContainer(Container container)
        {
            ConfigStrapperNoScopped.RegisterServices(container);
        }
    }
}
