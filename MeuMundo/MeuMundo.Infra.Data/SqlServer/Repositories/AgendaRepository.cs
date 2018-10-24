using MeuMundo.Domain.Entities;
using MeuMundo.Domain.Enum;
using MeuMundo.Domain.Interfaces.Repository;
using MeuMundo.Infra.Data.SqlServer.Context;
using System.Collections.Generic;
using System.Linq;

namespace MeuMundo.Infra.Data.SqlServer.Repositories
{
    public class AgendaRepository : IAgendaRepository
    {
        private readonly ContextEf _context = ContextEf.GetContext();

        public List<Agenda> GetListByDayWeek(DiaSemanaEnum diaSemana)
        {
            return _context.Agenda.Where(a => a.DiaSemanaId == (int)diaSemana).ToList();
        }
    }
}
