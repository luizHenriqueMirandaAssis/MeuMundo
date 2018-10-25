var Form = {

    Event: function () {

        $("#voltar-lista-agenda").click(function () {
            window.location.href = path + "Agenda/Lista/" + $("#container-agenda-form").attr("data-dia-semana-id");
        });
    },
    Validar: function () {

        Common.ValidateFieldRequired("#descricao", false);
        Common.ValidateFieldRequired("#mensagem", false);
        Common.ValidateFieldRequired("#hora", false);
        Common.ValidateFieldRequired("#duracao", false);
        Common.ValidateFieldRequired("#tipo-notificacao", false);


        $(".form-group.campo-erro").first().find("input").focus();

        if ($(".form-group.campo-erro").length === 0)
            return true;
        else
            return false;

    },
    GetData: function () {

        return {

            AgendaId: $("#container-agenda-form").attr("data-agenda-id"),
            DiaSemanaId: $("#container-agenda-form").attr("data-dia-semana-id"),
            Descricao: $("#descricao").val(),
            Mensagem: $("#mensagem").val(),
            Hora: $("#hora").val(),
            Duracao: $("#duracao").val(),
            TipoNotificacaoId: $("#tipo-notificacao").val(),

        };

    }
};