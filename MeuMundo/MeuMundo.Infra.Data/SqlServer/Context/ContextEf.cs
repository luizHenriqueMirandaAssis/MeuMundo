using MeuMundo.Domain.Entities;
using MeuMundo.Infra.Data.SqlServer.Mapping;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace MeuMundo.Infra.Data.SqlServer.Context
{
    public class ContextEf : DbContext
    {
        public DbSet<Agenda> Agenda { get; set; }

        public ContextEf() : base("MeuMundoContext")
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            #region Conventions

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();

            #endregion

            #region Configurations  
            modelBuilder.Configurations.Add(new AgendaMap());
            #endregion

            base.OnModelCreating(modelBuilder);
        }

        public static ContextEf GetContext()
        {
            return new ContextEf();
        }
    }
}
