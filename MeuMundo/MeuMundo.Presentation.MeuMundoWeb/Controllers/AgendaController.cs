using MeuMundo.Domain.Interfaces.Repository;
using System.Web.Mvc;

namespace MeuMundo.Presentation.MeuMundoWeb.Controllers
{
    public class AgendaController : Controller
    {
        private readonly IAgendaRepository _agendaRepository;

        public AgendaController(IAgendaRepository agendaRepository)
        {
            _agendaRepository = agendaRepository;
        }

        // GET: Agenda
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Lista()
        {
            return View();
        }

        public ActionResult Novo()
        {
            return View();
        }

        public ActionResult Editar()
        {
            return View();
        }

    }
}