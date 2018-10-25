﻿$(document).ready(function () {

    UpdateSchedule.Get();
    Form.Event();
});

$("#salvar-agenda").click(function () {

    UpdateSchedule.Save();

});

var UpdateSchedule = {

    Get: function () {

        var id = $("#container-agenda-form").attr("data-agenda-id")

        Common.Ajax("Agenda/GetById/?id=" + id, "POST", null, $("#block-loading, #loading-aplicacao"), null, UpdateSchedule.GetSuccess, UpdateSchedule.GetError);

    },
    GetSuccess: function (pData) {

        var agenda = pData.response;

        $("#container-agenda-form").attr("data-dia-semana-id", agenda.DiaSemanaId);
        $("#descricao").val(agenda.Descricao);
        $("#mensagem").val(agenda.Mensagem);
        $("#hora").val(agenda.Hora);
        $("#duracao").val(agenda.Duracao);
        $("#tipo-notificacao").val(agenda.TipoNotificacaoId);


    },
    GetError: function () {

        Common.ShowApplicationAlert(AlertType.Danger, "Ocorreu um erro ao carregar os dados");

    },
    Save: function () {

        if (Form.Validar()) {

            var solicitacao = JSON.stringify(Form.GetData());

            Common.Ajax("Agenda/Update", "POST", solicitacao, $("#block-loading, #loading-aplicacao"), null, UpdateSchedule.SaveSuccess, UpdateSchedule.SaveError);

        }

    },
    SaveSuccess: function (pData) {

        var retorno = pData;

        if (retorno) {

            Common.ShowApplicationAlert(AlertType.Success, "Dados atualizados com sucesso");
            return;
        }

        UpdateSchedule.SaveError();
    },
    SaveError: function () {

        Common.ShowApplicationAlert(AlertType.Danger, "Ocorreu um erro ao atualizar os dados");

    }
};