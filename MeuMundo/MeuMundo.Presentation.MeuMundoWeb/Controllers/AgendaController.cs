using MeuMundo.Domain.Entities;
using MeuMundo.Domain.Interfaces.Repository;
using MeuMundo.Presentation.MeuMundoWeb.Models;
using System;
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

        public ActionResult Lista(int id)
        {
            TempData["DiaSemanaId"] = id;
            return View();
        }

        public ActionResult Novo(int id)
        {
            TempData["DiaSemanaId"] = id;
            TempData["AgendaId"] = 0;
            return View();
        }

        public ActionResult Editar(int id)
        {
            TempData["DiaSemanaId"] = 0;
            TempData["AgendaId"] = id;
            return View();
        }

        public JsonResult GetListSchedule(int id)
        {
            try
            {
                var list = ResponseAgenda.BuildList(_agendaRepository.GetListByDayWeek(id));

                return Json(new { list }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return Json(new { }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetById(int id)
        {
            try
            {
                var response = ResponseAgenda.Build(_agendaRepository.GetById(id));

                return Json(new { response }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return Json(new { }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Add(Agenda agenda)
        {
            var result = false;

            try
            {
                _agendaRepository.New(agenda);

                result = true;
                return Json(new { result }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return Json(new { result }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Update(Agenda agenda)
        {
            var result = false;

            try
            {
                _agendaRepository.Update(agenda);

                result = true;
                return Json(new { result }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return Json(new { result }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Delete(int id)
        {
            var result = false;

            try
            {
                _agendaRepository.Delete(id);

                result = true;
                return Json(new { result }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return Json(new { result }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}