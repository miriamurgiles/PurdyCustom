define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';
    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
    $(window).ready(onRender);
    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    connection.on('requestedInteraction', onRequestedInteraction);
    connection.on('requestedTriggerEventDefinition', onRequestedTriggerEventDefinition);
    connection.on('requestedDataSources', onRequestedDataSources);
    connection.on('requestedSchema', function (data) {
        // save schema
        console.log('*** Schema ***', JSON.stringify(data['data_for_user_whats']));
    });
    connection.on('clickedNext', save);
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
        connection.trigger('requestInteraction');
        connection.trigger('requestTriggerEventDefinition');
        connection.trigger('requestDataSources');
        connection.trigger('requestSchema');
    }
    function onRequestedDataSources(dataSources) {
        console.log('*** requestedDataSources ***');
        console.log(dataSources);
    }
    function onRequestedInteraction(interaction) {
        console.log('*** requestedInteraction ***');
        console.log(interaction);
    }
    function onRequestedTriggerEventDefinition(eventDefinitionModel) {
        console.log('*** requestedTriggerEventDefinition ***');
        console.log(eventDefinitionModel);
    }
    function initialize(data) {
        console.log(data);
        if (data) {
            payload = data;
        }
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );
        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};
        console.log(inArguments);
        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
            });
        });
        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }
    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }
    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }
    function save() {
        var templateId = $('#plantilla_what').val();
        var templateDE = $('#plantilla_de').val();
        if (templateDE == 'OPORTUNIDAD_LEXUS_B2C') {
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506" + "{{Contact.Attribute.OPORTUNIDAD_LEXUS_B2C.PersonMobilePhone}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.OPORTUNIDAD_LEXUS_B2C.Nombre}}",
                "templateId": templateId
            }];
        }
        if (templateDE == 'LEADS_NUEVOS_B2C') {
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506" + "{{Contact.Attribute.LEADS_NUEVOS_B2C.Telefono}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.LEADS_NUEVOS_B2C.Primer_Nombre}}",
                "templateId": templateId
            }];
        }
        if (templateDE == 'DATOS_PARA_PROBAR') {
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506" + "{{Contact.Attribute.DATOS_PARA_PROBAR.Phone}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.DATOS_PARA_PROBAR.name}}",
                "templateId": templateId
            }];
        }
        if (templateDE == 'DATOS_PARA_PMP') {
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506" + "{{Contact.Attribute.Nueva trayectoria - 16 de mayo de 2024 0938 - 2024-05-16T100846363.Opportunity:Account:Telefono_celular__c}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.Nueva trayectoria - 16 de mayo de 2024 0938 - 2024-05-16T100846363.Opportunity:Account:FirstName}}",
                "templateId": templateId
            }];
        }
        if (templateDE == 'GP_Op_en_proceso_WA_1') {
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506" + "{{Contact.Attribute.GP_Op_en_proceso_WA_1.PersonMobilePhone}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.GP_Op_en_proceso_WA_1.AccountName}}",
                "Enlace": "https://cloud.mkcloud.grupopurdy.com/Control_de_Calidad?numCon=" + "{{Contact.Attribute.GP_Op_en_proceso_WA_1.Numero_Consecutivo__c}}",
                "templateId": templateId
            }];
        }
        if (templateDE == 'LEADS XPENG 2024 _ XPENG Costa Rica 274053937') {
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506" + "{{Contact.Attribute.LEADS XPENG 2024 _ XPENG Costa Rica 274053937.Opportunity:Account:phone_number}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.LEADS XPENG 2024 _ XPENG Costa Rica 274053937.Opportunity:Account:full_name}}",
                "templateId": templateId
            }];
        }
        if (templateDE == 'GP_Oportunidades_2024') {
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506" + "{{Contact.Attribute.GP_Oportunidades_2024.Cliente personal:Móvil}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.GP_Oportunidades_2024.Nombre del cliente}}",
                "templateId": templateId
            }];
        }
        if (templateDE == 'Hino Form SF _ Hino Costa Rica 285181589') {
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506" + "{{Contact.Attribute.Hino Form SF _ Hino Costa Rica 285181589.Cliente personal:Móvil}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.Hino Form SF _ Hino Costa Rica 285181589.Nombre del cliente}}",
                "templateId": templateId
            }];
        }
        if (templateDE == 'Opp_EnProceso_WA_Feria') {
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506" + "{{Contact.Attribute.Opp_EnProceso_WA_Feria.Cliente personal:Móvil}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.Opp_EnProceso_WA_Feria.Nombre del cliente}}",
                "templateId": templateId
            }];
        }
        if (templateDE == 'Ops_UltimosSeisMeses') {
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506" + "{{Contact.Attribute.Ops_UltimosSeisMeses.Cliente personal:Móvil}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.Ops_UltimosSeisMeses.Nombre del cliente}}",
                "templateId": templateId
            }];
        }
        if (templateDE == 'Journey_OfertaUnidadSeparada') {
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506" + "{{Contact.Attribute.Journey_OfertaUnidadSeparada.Cliente personal:Móvil}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.Journey_OfertaUnidadSeparada.Nombre del cliente}}",
                "templateId": templateId
            }];
        }
        if (templateDE == 'Journey_OfertaProactiva') {
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506" + "{{Contact.Attribute.Journey_OfertaProactiva.Cliente personal:Móvil}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.Journey_OfertaProactiva.Nombre del cliente}}",
                "templateId": templateId
            }];
        }
        if (templateDE == 'Leads_G3I_2025 Xpeng') {
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506" + "{{Contact.Attribute.Leads_G3I_2025 Xpeng.Cliente personal:Móvil}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.Leads_G3I_2025 Xpeng.Nombre del cliente}}",
                "templateId": templateId
            }];
        }
        if (templateDE == 'Journey Feria Usados 1') {
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506" + "{{Contact.Attribute.Journey Feria Usados 1.Cliente personal:Móvil}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.Journey Feria Usados 1.Nombre del cliente}}",
                "templateId": templateId
            }];
        }
        if (templateDE == 'Journey Feria Usados 2') {
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506" + "{{Contact.Attribute.Journey Feria Usados 2.Cliente personal:Móvil}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.Journey Feria Usados 2.Nombre del cliente}}",
                "templateId": templateId
            }];
        }
        if (templateDE == 'Bienvenida_2025') {
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506" + "{{Contact.Attribute.Bienvenida_2025.Cliente personal:Móvil}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.Bienvenida_2025.Nombre del cliente}}",
                "templateId": templateId
            }];
        }
        if (templateDE == 'Extension Faw Meta') {
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506" + "{{Contact.Attribute.Extension Faw Meta.Cliente personal:Móvil}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.Extension Faw Meta.Nombre del cliente}}",
                "templateId": templateId
            }];
        }
        if (templateDE == 'Black Purdy Faw') {
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506" + "{{Contact.Attribute.Black Purdy Faw.Cliente personal:Móvil}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.Black Purdy Faw.Nombre del cliente}}",
                "templateId": templateId
            }];
        }
        if (templateDE == 'Purdy_Notifications2') {
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": `506{{Contact.Attribute.Purdy_Notifications2.Cliente personal:Móvil}}`,
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.Purdy_Notifications.Nombre del cliente}}",
                "templateId": templateId
            }];
        }
     if (templateDE == 'Journey_Faw_Meta_Leads') {
    payload['arguments'].execute.inArguments = [{
        "tokens": authTokens,
        "phoneNumber": '{{Contact.Attribute.Journey_Faw_Meta_Leads.phone_number}}',
        "emailAddress": "{{InteractionDefaults.email}}",
        "clientName": "{{Contact.Attribute.Journey_Faw_Meta_Leads.full_name}}",
        "templateId": templateId
    }];
}
      if (templateDE == 'Higer_leads_form') {
    payload['arguments'].execute.inArguments = [{
        "tokens": authTokens,
        "phoneNumber": '{{Contact.Attribute.Higer_leads_form.phone_number}}',
        "emailAddress": "{{InteractionDefaults.email}}",
        "clientName": "{{Contact.Attribute.Higer_leads_form.full_name}}",
        "templateId": templateId
    }];
    }
  if (templateDE == 'Pruebas Faw') {
    payload['arguments'].execute.inArguments = [{
        "tokens": authTokens,
           "phoneNumber": "{{Contact.Attribute.Pruebas Faw.phone_number}}",
        "emailAddress": "{{InteractionDefaults.email}}",
        "clientName": "{{Contact.Attribute.Pruebas Faw.full_name}}",
        "templateId": templateId
    }];
    }
        payload['metaData'].isConfigured = true;
        console.log(payload);
        connection.trigger('updateActivity', payload);
    }
});
