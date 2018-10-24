using MeuMundo.Domain.Entities;
using MeuMundo.Domain.Enum;
using System.Collections.Generic;

namespace MeuMundo.Domain.Interfaces.Repository
{
    public interface IAgendaRepository
    {
        List<Agenda> GetListByDayWeek(DiaSemanaEnum diaSemana);
    }
}
