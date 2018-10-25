﻿$(document).ready(function () {
     Form.Event();
});

$("#salvar-agenda").click(function () {

    NewSchedule.Save();
});

var NewSchedule = {

    Save: function () {

        if (Form.Validar()) {

            var solicitacao = JSON.stringify(Form.GetData());
            console.log(solicitacao);
            Common.Ajax("Agenda/Add", "POST", solicitacao, $("#block-loading, #loading-aplicacao"), null, NewSchedule.SaveSuccess, NewSchedule.SaveError);

        }

    },
    SaveSuccess: function (data) {

        if (data) {

            window.location.href = path + "Agenda/Lista/" + $("#container-agenda-form").attr("data-dia-semana-id");
        } else {

            NewSchedule.SaveError();
        }

    },
    SaveError: function () {

        Common.ShowApplicationAlert(AlertType.Danger, "Ocorreu um erro ao cadastrar o notificação");

    }

};