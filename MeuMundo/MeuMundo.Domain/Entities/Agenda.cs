using System;

namespace MeuMundo.Domain.Entities
{
    public class Agenda
    {
        public int AgendaId { get; set; }
        public int DiaSemanaId { get; set; }
        public int TipoNotificacaoId { get; set; }
        public TimeSpan Hora { get; set; }
        public TimeSpan Duracao { get; set; }
        public string Descricao { get; set; }
        public string Mensagem { get; set; }
    }
}