using MeuMundo.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MeuMundo.Presentation.MeuMundoWeb.Models
{
    public class ResponseAgenda
    {
        public int AgendaId { get; set; }
        public int DiaSemanaId { get; set; }
        public string TipoNotificacao { get; set; }
        public int TipoNotificacaoId { get; set; }
        public string Hora { get; set; }
        public string Duracao { get; set; }
        public string Descricao { get; set; }
        public string Mensagem { get; set; }

        public static List<ResponseAgenda> BuildList(List<Agenda> listAgenda)
        {
            var listResponse = new List<ResponseAgenda>();

            if (listAgenda == null || !listAgenda.Any())
                return listResponse;

            foreach (var item in listAgenda)
            {
                var response = new ResponseAgenda
                {
                    AgendaId = item.AgendaId,
                    DiaSemanaId = item.DiaSemanaId,
                    Descricao = item.Descricao,
                    Mensagem = item.Mensagem,
                    TipoNotificacao = GetDecription(item.TipoNotificacaoId),
                    Hora = item.Hora.ToString(@"hh\:mm\:ss")
                };

                listResponse.Add(response);
            }

            return listResponse;
        }

        public static ResponseAgenda Build(Agenda agenda)
        {
            return new ResponseAgenda
            {
                AgendaId = agenda.AgendaId,
                DiaSemanaId = agenda.DiaSemanaId,
                Descricao = agenda.Descricao,
                Mensagem = agenda.Mensagem,
                TipoNotificacao = GetDecription(agenda.TipoNotificacaoId),
                TipoNotificacaoId = agenda.TipoNotificacaoId,
                Hora = agenda.Hora.ToString(@"hh\:mm\:ss"),
                Duracao = agenda.Duracao.ToString(@"hh\:mm\:ss")
            };
        }



        public static string GetDecription(int TipoNotificacaoId)
        {
            switch (TipoNotificacaoId)
            {
                case 0:
                    return "Não definido";

                case 1:
                    return "Mensagem";

                case 2:
                    return "Vibrar";

                case 3:
                    return "Som";

                default:
                    return "";
            }
        }
    }
}