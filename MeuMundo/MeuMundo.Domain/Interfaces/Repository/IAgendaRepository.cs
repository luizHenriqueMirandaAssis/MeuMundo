using MeuMundo.Domain.Entities;
using MeuMundo.Domain.Enum;
using System.Collections.Generic;

namespace MeuMundo.Domain.Interfaces.Repository
{
    public interface IAgendaRepository
    {
        Agenda GetById(int agendaId);
        List<Agenda> GetListByDayWeek(int diaSemana);
        void New(Agenda agenda);
        Agenda Update(Agenda agenda);
        void Delete(int agendaId);
    }
}
