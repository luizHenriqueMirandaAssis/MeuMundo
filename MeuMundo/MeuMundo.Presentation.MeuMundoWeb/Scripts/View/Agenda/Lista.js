$(document).ready(function () {
    List.AddUrlNewSchedule();
    List.GetListSchedule();
});


var List = {

    AddUrlNewSchedule: function () {
        var url = path + "Agenda/Novo/" + $("#container-lista").attr("data-dia-semana-id");
        $("#novo-notificacao").attr("href", url);
    },
    GetListSchedule: function () {
        var diaSemanaId = $("#container-lista").attr("data-dia-semana-id");
        var url = "Agenda/GetListSchedule/?id=" + diaSemanaId;
        Common.Ajax(url, "GET", null, null, null, List.GetListScheduleSuccess, List.GetListScheduleError);
    },
    GetListScheduleSuccess: function (pData) {
        var html = "";

        $(pData.list).each(function (index, value) {

            html +=
                "<tr>" +
                '<td class="align-center"><a class="visualizar-usuario" href="' + path + 'Agenda/Editar/' + value.AgendaId + '"><span class="glyphicon glyphicon-search"></span></a></td>' +
                '<td class="uppercase">' + value.Descricao + "</td>" +
                '<td class="uppercase">' + value.Hora + "</td>" +
                '<td class="uppercase">' + value.TipoNotificacao + "</td>" +
                "</tr>";

        });

        $("#table-agenda tbody").empty().append(html);
    },
    GetListScheduleError: function () {
        Common.ShowApplicationAlert(AlertType.Danger, "Ocorreu um erro ao buscar os dados");
    }
};