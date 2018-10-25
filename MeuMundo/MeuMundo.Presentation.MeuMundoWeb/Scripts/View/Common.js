﻿var gTimeoutAlertApplication = null;
var gMsgInformativa = {

    RequisitoNaoAtendido: "Ops! Ocorreu um erro, o requisito abaixo não foi atendido:",
    RequisitosNaoAtendidos: "Ops! Ocorreu um erro, os requisitos abaixo não foram atendidos:"

};
var AlertType = {

    Success: "alert-success",
    Info: "alert-info",
    Warning: "alert-warning",
    Danger: "alert-danger"

};
var Keyboard = {
    Tab: 9,
    Enter: 13,
    Escape: 27,
    Space: 32,
    Delete: 46
};

var Common = {

    Ajax: function (pUrl, pType, pValor, pLoading, pLoadingBtn, pFuncSuccess, pFuncError, pFuncComplete, pFuncBeforeSend, pDataType, pContentType, pAssync, pProcessData) {

        /// <summary>
        ///
        ///     Função AJAX Global. (Valores não obrigatórios atribuir NULL).
        ///
        /// </summary>
        /// <param name="pUrl" type="string">URL a ser chamada. (Obrigatório)</param>
        /// <param name="pType" type="string">Tipo de requisição POST/GET/PUT/DELETE E ETC. (Obrigatório)</param>
        /// <param name="pValor" type="pDataType">Valor a ser enviado. (Não requerido)</param>
        /// <param name="pLoading" type="seletor">Loading a ser exibido durante o processo de requisição. (Não requerido)</param>        
        /// <param name="pLoadingBtn" type="seletor">Status "Aguarde" no botão durante o processo de requisição. (Não requerido)</param>        
        /// <param name="pFuncSuccess" type="function">Função a ser disparada no sucesso da requisição. (Não requerido)</param>        
        /// <param name="pFuncError" type="function">Função a ser disparada no erro da requisição. (Não requerido)</param>        
        /// <param name="pFuncComplete" type="function">Função a ser disparada quando a requisição completar. (Não requerido)</param>        
        /// <param name="pFuncBeforeSend" type="function">Função a ser disparada antes do envio da requisição. (Não requerido)</param>
        /// <param name="pDataType" type="string">Tipo de valor. (Não requerido) (Default: JSON)</param>        
        /// <param name="pContentType" type="string">Conteúdo do valor. (Não requerido) (Default: application/json; charset=utf-8)</param>
        /// <param name="pAssync" type="bool">Requisição assíncrona. (Não requerido) (Default: TRUE)</param>   
        /// <param name="pProcessData" type="bool">Serão processados ​​e transformados em uma string de consulta, ajustando-se ao tipo de conteúdo padrão (Não requerido) (Default: TRUE)</param>

        try {

            // Definindo valores padrão caso parâmetro vier NULL.        
            pDataType = pDataType == null ? "JSON" : pDataType;
            pContentType = pContentType == null ? "application/json; charset=utf-8" : pContentType;
            pAssync = pAssync == null ? true : pAssync;
            pProcessData = pProcessData == null ? true : pProcessData;

            var wTituloBtn = null;

            $.ajax({
                url: path + pUrl,
                type: pType,
                data: pValor,
                dataType: pDataType,
                contentType: pContentType,
                assync: pAssync,
                processData: pProcessData,
                success: function (data) {

                    if (pFuncSuccess != null)
                        pFuncSuccess(data);

                },
                error: function (data) {

                    if (pFuncError != null)
                        pFuncError(data);

                },
                complete: function () {

                    if (pLoading != null)
                        $(pLoading).hide();

                    if (pFuncComplete != null)
                        pFuncComplete();

                    if (pLoadingBtn != null)
                        $(pLoadingBtn).removeClass('disabled').html(wTituloBtn);

                },
                beforeSend: function (data) {

                    if (pLoading != null)
                        $(pLoading).show();

                    if (pFuncBeforeSend != null)
                        pFuncBeforeSend(data);

                    if (pLoadingBtn != null) {
                        wTituloBtn = $(pLoadingBtn).html();
                        $(pLoadingBtn).addClass('disabled').html("Aguarde...");
                    }

                }
            });

        } catch (e) {

            console.log("Erro ao enviar requisição ajax. Detalhes: " + e.message);

        }

    },
    AdicionarErroCampoForm: function (pCampo, pMsgErro) {
        Common.RemoverErroCampoForm(pCampo);
        $(pCampo).closest(".form-group").addClass("campo-erro");
        $(pCampo).closest(".form-group").prepend('<span class=\"icone-info glyphicon glyphicon-info-sign\" style=\"float:right;\"></span>');
        $(pCampo).before('<span class="msg-campo-erro" hidden>' + pMsgErro + "</span>");
        //$(pCampo).removeAttr("disabled");

    },
    AdicionarMensagemCampoForm: function (pCampo, pMsg, pCustom) {

        var classMsgErro = (pCustom !== undefined && pCustom)
            ? "msg-campo-erro-custom"
            : "msg-campo-erro";

        Common.RemoverErroCampoForm(pCampo);
        $(pCampo).closest(".form-group").addClass("campo-erro");
        $(pCampo).after('<span class="' + classMsgErro + '">' + pMsg + "</span>");

    },
    AddListMessageError: function (pMensagem) {

        var erros = "";
        var mensagem = "";

        if ((pMensagem != null)) {

            if (pMensagem.length === 1) {
                mensagem = pMensagem;
            } else {

                $(pMensagem).each(function (index, value) {
                    erros += "<li>" + value + "</li>";
                });

                mensagem = gMsgInformativa.RequisitosNaoAtendidos +
                    '<ul class="msgs-erro-alerta">' +
                    erros +
                    "</ul>";
            }
        }

        return mensagem;
    },
    AddAttr: function (pElemento, pAttr, pValor) {
        $(pElemento).attr(pAttr, pValor);
    },
    AddStyle: function (pElemento, pAttribute, pValor) {
        $(pElemento).css(pAttribute, pValor);
    },
    AddMaskDate: function (pElementoId) {
        $(pElementoId).mask("99/99/9999");
    },
    AddMaskDateTime: function (pElementoId) {
        $(pElementoId).mask("99/99/9999 99:99");
    },
    AddMaskTel: function (pElementId, pValue) {

        jQuery(pElementId)
            .val(pValue).mask("(99) 9999-9999?9")
            .focusout(function (event) {
                var target, phone, element;
                target = (event.currentTarget) ? event.currentTarget : event.srcElement;
                phone = target.value.replace(/\D/g, '');
                element = $(target);
                element.unmask();
                if (phone.length > 10) {
                    element.mask("(99) 99999-999?9");
                } else {
                    element.mask("(99) 9999-9999?9");
                }
            });
    },
    AddElementError: function (pElement, pTextTitle) {

        $(pElement).css("border", "1px solid #961100");
        $(pElement).addClass("element-erro");
        $(pElement).attr("title", pTextTitle);

    },
    RemoverErroCampoForm: function (pCampo) {

        $(pCampo).closest(".form-group").removeClass("campo-erro");
        $(pCampo).closest(".form-group").find(".icone-info").remove();
        $(pCampo).closest(".form-group").find(".msg-campo-erro").remove();
        $(pCampo).closest(".form-group").find(".msg-campo-erro-custom").remove();
    },
    RemoveElementError: function (pElement) {

        $(pElement).css("border", "1px solid #ccc");
        $(pElement).removeClass("element-erro");
        $(pElement).attr("title", "");
    },
    RemoveAttr: function (pElemento, pAttr) {
        $(pElemento).removeAttr(pAttr);
    },
    DatePicker: function (pElemento, pFuncOnSelect) {

        $(pElemento).datepicker({

            dateFormat: "dd/mm/yy",
            dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
            dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S", "D"],
            dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
            monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            nextText: "Próximo",
            prevText: "Anterior",
            onSelect: function (pDateText, pInst) {

                if (pFuncOnSelect !== null || pFuncOnSelect !== undefined)
                    pFuncOnSelect(pDateText, pInst);
            }

        });

    },
    DatePickerNew: function (pElemento, pMinDate, pMaxDate) {
        $(pElemento).datetimepicker({
            format: 'DD/MM/YYYY',
            locale: "pt-br",
            minDate: pMinDate,
            maxDate: pMaxDate
        });
    },
    DateTimePicker: function (pElemento, pMaxDate) {
        $(pElemento).datetimepicker({
            locale: "pt-br",
            maxDate: pMaxDate
        });
    },
    DatePickerPeriod: function (pElementDateStart, pElementDateEnd) {

        var dateFormat = "dd/mm/yy";
        var dataMinima = null;
        var dataMaxima = new Date();

        $(function () {

            $(pElementDateStart)
                .datepicker({
                    dateFormat: "dd/mm/yy",
                    dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
                    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S", "D"],
                    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
                    monthNames: [
                        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto",
                        "Setembro", "Outubro", "Novembro", "Dezembro"
                    ],
                    monthNamesShort: [
                        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto",
                        "Setembro", "Outubro", "Novembro", "Dezembro"
                    ],
                    nextText: "Próximo",
                    prevText: "Anterior",
                    minDate: dataMinima,
                    maxDate: dataMaxima,
                    showOtherMonths: true
                })
                .on("change",
                    function () {

                        if (!Common.IsNotEmpty($(this).val())) {
                            $(pElementDateStart).val("");
                            $(pElementDateEnd).val("");
                            return;
                        }

                        var dataFinal = $.datepicker.parseDate(dateFormat, $(pElementDateEnd).val());

                        if ($(this).val().trim() === "") {
                            $(pElementDateStart).val($.datepicker.formatDate(dateFormat, dataFinal));
                            return;
                        }

                        var date = Common.GetDate($(this).val());

                        dataMinima = new Date(date);

                        to.datepicker("option", "minDate", dataMinima);
                        to.datepicker("option", "maxDate", dataMaxima);

                        setTimeout(function () { $(pElementDateEnd).datepicker("show"); }, 100);
                    });

            var to = $(pElementDateEnd)
                .datepicker({
                    dateFormat: "dd/mm/yy",
                    dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
                    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S", "D"],
                    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
                    monthNames: [
                        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto",
                        "Setembro", "Outubro", "Novembro", "Dezembro"
                    ],
                    monthNamesShort: [
                        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto",
                        "Setembro", "Outubro", "Novembro", "Dezembro"
                    ],
                    nextText: "Próximo",
                    prevText: "Anterior",
                    minDate: dataMinima,
                    maxDate: dataMaxima,
                    showOtherMonths: true
                })
                .on("change",
                    function () {

                        if (!Common.IsNotEmpty($(this).val())) {
                            $(pElementDateStart).val("");
                            $(pElementDateEnd).val("");
                            return;
                        }

                        var dataInicial = Common.GetDate($(pElementDateStart).val());
                        var dataFinalAtual = Common.GetDate($(this).val());

                        if (dataFinalAtual < dataInicial)
                            $(pElementDateEnd).val($.datepicker.formatDate(dateFormat, dataInicial));

                        if (dataFinalAtual < dataMinima)
                            $(pElementDateEnd).val($.datepicker.formatDate(dateFormat, dataInicial));
                    });
        });
    },
    ExibirLoadingApp: function () {

        $("#block-loading, #loading-aplicacao").show();

    },
    Empty: function (pElemento) {
        $(pElemento).empty();
    },
    EnableScrollBarBody: function () {

        $("body").css("overflow-y", "auto");
    },
    HideScrollBarBody: function () {
        $("body").css("overflow-y", "hidden");
    },
    ErroReadonly: function (pElemento) {
        $(pElemento).attr("readonly", false);
    },
    OcultarLoadingApp: function () {

        $("#block-loading, #loading-aplicacao").hide();

    },
    FormatarDataMilisegundos: function (pMilisegundos) {

        if (pMilisegundos == null)
            return "-";

        var milisegundos = pMilisegundos.replace(/\D/g, '');
        var data = new Date();
        data.setTime(milisegundos);
        var dataFormatada = data.toLocaleDateString();
        return dataFormatada;
    },
    FormatarDataHoraMilisegundos: function (pMilisegundos) {

        if (pMilisegundos == null)
            return "-";

        var milisegundos = pMilisegundos.replace(/\D/g, '');

        //Verificando data Default (0001-01-01 00:00:00)
        if (-milisegundos == -62135589600000)
            return null;

        var data = new Date();
        data.setTime(milisegundos);
        var dataFormatada = data.toLocaleDateString();
        var horaFormatada = data.toLocaleTimeString();
        return dataFormatada + " " + horaFormatada;
    },
    FormatarDataInternacionalParaNacional: function (pData, pExibeHora) {

        pData = pData.substring(0, 19).replace("T", " ").split(" ");

        var data = pData[0];
        var hora = pData[1];

        var dataSeparada = data.split("-");

        var ano = dataSeparada[0];
        var mes = dataSeparada[1];
        var dia = dataSeparada[2];

        if (pExibeHora)
            return dia + "/" + mes + "/" + ano + " " + hora;
        else
            return dia + "/" + mes + "/" + ano;
    },
    ValidarEmail: function (pEmail) {

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(pEmail);

        // var wRegEx = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        //return wRegEx.test(pEmail);
    },
    ValidateCampoEmail: function (pElementId) {

        if ($(pElementId).val().trim() === "")
            Common.AdicionarMensagemCampoForm($(pElementId), "Campo obrigatório", true);
        else if (!Common.ValidarEmail($(pElementId).val()))
            Common.AdicionarMensagemCampoForm($(pElementId), "E-mail inválido", true);
        else
            Common.RemoverErroCampoForm($(pElementId));
    },
    ValidateFieldRequired: function (pElementId, pCustomField) {

        if ($(pElementId).is("select")) {

            if ($(pElementId).val() === "" || $(pElementId).val() === null) {
                Common.AdicionarMensagemCampoForm($(pElementId), "Campo obrigatório", pCustomField);
                return false;
            } else {
                Common.RemoverErroCampoForm($(pElementId));
                return true;
            }
        }
        else if ($(pElementId).val().trim() === "") {
            Common.AdicionarMensagemCampoForm($(pElementId), "Campo obrigatório", pCustomField);
            return false;
        } else {
            Common.RemoverErroCampoForm($(pElementId));
            return true;
        }
    },
    VerificarSenhasCoincidem: function (pCampoSenha, pCampoConfirmacaoSenha) {

        var wSenha = pCampoSenha.trim();
        var wConfirmacaoSenha = pCampoConfirmacaoSenha.trim();

        if (wSenha !== wConfirmacaoSenha)
            return false;

        return true;
    },
    IsDateValid: function (d) {

        if (Object.prototype.toString.call(d) === "[object Date]") {

            if (isNaN(d.getTime())) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }

    },
    IsDateStringValid: function (pIdDateString) {

        var bits = $(pIdDateString).val().split('/');
        var d = new Date(bits[2], bits[1] - 1, bits[0]);
        return d && (d.getMonth() + 1) == bits[1];
    },
    IsValidRegistroMs: function (pRegistroMs) {
        return (pRegistroMs != null && pRegistroMs.length === 13 && !isNaN(pRegistroMs));
    },
    DateTimeValid: function (pElement) {

        var valor = $(pElement).val();
        return moment(valor, "DD/MM/YYYY HH:mm", true).isValid();
    },
    IsTimeValid: function (pTime) {

        return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(pTime);
    },
    IsNotEmpty: function (pValue) {

        return (pValue !== undefined && pValue !== null && pValue !== "" && !jQuery.isEmptyObject(pValue)) ? true : false;

    },
    ShowApplicationAlert: function (pAlertType, pMessage, pDisplayTimeInMilliseconds, pDisplayCloseButton, pSetTimeout, pLarge) {

        pSetTimeout = pSetTimeout !== undefined ? pSetTimeout : true;
        window.clearTimeout(gTimeoutAlertApplication);
        pLarge = pLarge !== undefined ? pLarge : false;

        if ($("#alert-application").length === 0) {

            $("body").prepend('<div id="alert-application" class="alert alert-dismissible" role="alert"></div>');

        }

        if (pDisplayTimeInMilliseconds == undefined)
            pDisplayTimeInMilliseconds = 4000;

        if (pDisplayCloseButton == undefined)
            pDisplayCloseButton = true;

        var closeButton = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';

        if (!pDisplayCloseButton)
            closeButton = "";

        $("#alert-application")
            .removeClass(AlertType.Danger)
            .removeClass(AlertType.Info)
            .removeClass(AlertType.Success)
            .removeClass(AlertType.Warning);


        if (pLarge)
            $("#alert-application").addClass("alert-application-large").addClass(pAlertType).html(closeButton + pMessage).show();
        else
            $("#alert-application").removeClass("alert-application-large").addClass(pAlertType).html(closeButton + pMessage).show();

        if (pSetTimeout) {
            gTimeoutAlertApplication = setTimeout(function () {

                $("#alert-application").hide();

            },
                pDisplayTimeInMilliseconds);
        } else {
            $(document).on("click", function () {
                $("#alert-application").hide();
            });
        }
    },
    GravarCookie: function (pName, pValor, pTempoExpira, pPath) {

        var tokenExpira = new Date();
        tokenExpira.setTime(tokenExpira.getTime() + pTempoExpira);

        document.cookie = pName + '=' + pValor + ';expires=' + tokenExpira.toUTCString() + ';path=' + pPath + ';';

    },
    GetDate: function (pElementValue) {

        var date;

        try {

            date = $.datepicker.parseDate("dd/mm/yy", pElementValue);

        } catch (error) {

            date = null;

        }

        return date;
    },
    GetDateCurrent: function () {
        var date = new Date();
        return Common.FormatarDataInternacionalParaNacional(date.toJSON(), false);
    },
    GetMaxValueInt: function () {
        return 2147483647;
    },
    GetDifferenceBetweenDates: function (pDateStart, pDateEnd) {

        // Formato da data que deve ser passo: MM/DD/YYYY

        var dateStart = new Date(pDateStart);
        var dateEnd = new Date(pDateEnd);
        var timeDiff = Math.abs(dateEnd.getTime() - dateStart.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        return diffDays;
    },
    GetDateMilissegundos: function (pDateString) {
        return Date.parse(pDateString);
    },
    LerCookie: function (pName) {

        var cookies = document.cookie;
        var prefix = pName + "=";
        var begin = cookies.indexOf("; " + prefix);

        if (begin == -1) {

            begin = cookies.indexOf(prefix);

            if (begin != 0) {
                return null;
            }

        } else {
            begin += 2;
        }

        var end = cookies.indexOf(";", begin);

        if (end == -1) {
            end = cookies.length;
        }

        return unescape(cookies.substring(begin + prefix.length, end));

    },
    ApagarCookie: function (pName, pPath) {

        document.cookie = pName + '=' + ';expires=-1' + ';path=' + pPath + ';';

    },
    MascararCnpj: function (pCnpj) {
        /// <summary>Função responsável por colocar máscara em uma string de CNPJ.</summary>
        if (pCnpj != null && pCnpj != "")
            return pCnpj.substring(0, 2) +
                "." +
                pCnpj.substring(2, 5) +
                "." +
                pCnpj.substring(5, 8) +
                "/" +
                pCnpj.substring(8, 12) +
                "-" +
                pCnpj.substring(12, 14);
        else
            return "";

    },
    ObjectifyForm: function (formArray) {

        var returnArray = {};
        for (var i = 0; i < formArray.length; i++) {
            returnArray[formArray[i]["name"]] = formArray[i]["value"];
        }
        return returnArray;
    },
    TruncateTime: function (data) {

        return data.substring(0, 10);

    },
    EncodeBase64: function (str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    },
    IsLeapYear: function (year) {

        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);

    },
    CpfIsValid: function (strCPF) {

        strCPF = Common.SomenteNumeros(strCPF);

        var Soma;
        var Resto;
        Soma = 0;

        if (strCPF == "00000000000" ||
            strCPF == "11111111111" ||
            strCPF == "22222222222" ||
            strCPF == "33333333333" ||
            strCPF == "44444444444" ||
            strCPF == "55555555555" ||
            strCPF == "66666666666" ||
            strCPF == "77777777777" ||
            strCPF == "88888888888" ||
            strCPF == "99999999999") {
            return false;
        }

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;

    },
    SomenteNumeros: function (value) {

        return value.replace(/[^0-9]/g, '');

    },
    TratarValorNull: function (value) {

        if (value === null || value === undefined)
            return "";

        return value;
    },
    TreatmentValueNullInDate: function (pValue) {

        var valorNullDate = "01/01/0001 00:00:00";
        var valorNullNotTime = "01/01/001";

        if (pValue === valorNullDate || pValue === valorNullNotTime || pValue == null)
            return "";
        else
            return pValue;
    },
    PopularComboUf: function (pNotDisabledNaoInformado) {

        var ret = "";

        if (pNotDisabledNaoInformado === true)
            ret += '<option value="0">Não informado</option>';
        else
            ret += '<option value="0" disabled hidden>Não informado</option>';

        Request.Get("/Uf/ObterTodos/",
            function (pData) {
                $(pData)
                    .each(function (index, value) {

                        var description = value.UfNome;
                        var selectValue = value.UfId;

                        if (value.UfId === 0)
                            return true;

                        ret += '<option value="' + selectValue + '">' + description + "</option>";
                    });
            },
            false);

        return ret;
    },
    LinkCalendarClickEvent: function () {

        $(".container-icone-input-calendar").click(function () {

            $(this).parent(".input-group").find("input").focus();

        });

    }
}
