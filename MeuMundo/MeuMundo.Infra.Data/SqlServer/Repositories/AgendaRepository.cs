using MeuMundo.Domain.Entities;
using MeuMundo.Domain.Interfaces.Repository;
using MeuMundo.Infra.Data.SqlServer.Context;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace MeuMundo.Infra.Data.SqlServer.Repositories
{
    public class AgendaRepository : IAgendaRepository
    {
        private readonly ContextEf _context = ContextEf.GetContext();

        public Agenda GetById(int agendaId)
        {
            return _context.Agenda.FirstOrDefault(x => x.AgendaId == agendaId);
        }
        public List<Agenda> GetListByDayWeek(int diaSemana)
        {
            return _context.Agenda.Where(a => a.DiaSemanaId == diaSemana).ToList();
        }

        public void New(Agenda agenda)
        {
            if (agenda == null)
                return;

            _context.Agenda.Add(agenda);
            _context.SaveChanges();
        }

        public Agenda Update(Agenda agenda)
        {
            var agendaAtual = GetById(agenda.AgendaId);

            agendaAtual.Descricao = agenda.Descricao;
            agendaAtual.Mensagem = agenda.Mensagem;
            agendaAtual.Hora = agenda.Hora;
            agendaAtual.Duracao = agenda.Duracao;
            agendaAtual.TipoNotificacaoId = agenda.TipoNotificacaoId;


            _context.Entry(agendaAtual).State = EntityState.Modified;
            _context.SaveChanges();

            return agendaAtual;
        }

        public void Delete (int agendaId)
        {
            var agendaDelete = GetById(agendaId);

            if (agendaDelete == null)
                return;

            _context.Agenda.Remove(agendaDelete);
            _context.SaveChanges();
        }
    }
}
