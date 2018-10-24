using MeuMundo.Domain.Entities;
using System.Data.Entity.ModelConfiguration;

namespace MeuMundo.Infra.Data.SqlServer.Mapping
{
    public class AgendaMap : EntityTypeConfiguration<Agenda>
    {
        public AgendaMap()
        {
            HasKey(a => a.AgendaId);
        }
    }
}
