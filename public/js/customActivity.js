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

    function onRequestedDataSources(dataSources){
        console.log('*** requestedDataSources ***');
        console.log(dataSources);
    }

    function onRequestedInteraction (interaction) {    
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
        if(templateDE == 'OPORTUNIDAD_LEXUS_B2C' ){
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506"+"{{Contact.Attribute.OPORTUNIDAD_LEXUS_B2C.PersonMobilePhone}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.OPORTUNIDAD_LEXUS_B2C.Nombre}}",
                "templateId": templateId
            }];
        }
        if(templateDE == 'LEADS_NUEVOS_B2C'){
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506"+"{{Contact.Attribute.LEADS_NUEVOS_B2C.Telefono}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.LEADS_NUEVOS_B2C.Primer_Nombre}}",
                "templateId": templateId
            }];
        }
        
        if(templateDE == 'DATOS_PARA_PROBAR'){
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506"+"{{Contact.Attribute.DATOS_PARA_PROBAR.Phone}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.DATOS_PARA_PROBAR.name}}",
                "templateId": templateId
            }];
        }

        if(templateDE == 'DATOS_PARA_PMP'){
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506"+"{{Contact.Attribute.Nueva trayectoria - 16 de mayo de 2024 0938 - 2024-05-16T100846363.Opportunity:Account:Telefono_celular__c}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.Nueva trayectoria - 16 de mayo de 2024 0938 - 2024-05-16T100846363.Opportunity:Account:FirstName}}",
                "templateId": templateId
            }];

        }

        if(templateDE == 'Journey de seguimiento a oportunidades en proceso Whatsapp - 2023-12-04T171510349'){
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506"+"{{Contact.Attribute.Journey de seguimiento a oportunidades en proceso Whatsapp - 2023-12-04T171510349.Opportunity:Account:PersonMobilePhone}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.Journey de seguimiento a oportunidades en proceso Whatsapp - 2023-12-04T171510349.Opportunity:Account:Name}}",
                "templateId": templateId
            }];

        }

        if(templateDE == 'LEADS XPENG 2024 _ XPENG Costa Rica 274053937'){
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506"+"{{Contact.Attribute.LEADS XPENG 2024 _ XPENG Costa Rica 274053937.Opportunity:Account:phone_number}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.LEADS XPENG 2024 _ XPENG Costa Rica 274053937.Opportunity:Account:full_name}}",
                "templateId": templateId
            }];

        }

        if(templateDE == 'GP_Oportunidades_2024'){
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "506"+"{{Contact.Attribute.GP_Oportunidades_2024.Cliente personal:Móvil}}",
                "emailAddress": "{{InteractionDefaults.email}}",
                "clientName": "{{Contact.Attribute.GP_Oportunidades_2024.Nombre del cliente}}",
                "templateId": templateId
            }];

        }

        if(templateDE == 'DATA_PRUEBA_NUEVOS_USER'){
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "phoneNumber": "{{Contact.Attribute.DATA_PRUEBA_NUEVOS_USER.Telefono_celular}}",
                "emailAddress": "{{InteractionDefaults.Email}}",
                "clientName": "{{Contact.Attribute.DATA_PRUEBA_NUEVOS_USER.Nombre_completo}}",
                "templateId": templateId
            }];
        }        
        
        
                /*Cambio MUR nueva plantilla test*/
                if(templateDE == 'TEST_FREEWAY_oportunidades_en_proceso_Whatsapp'){
                    payload['arguments'].execute.inArguments = [{
                        "tokens": authTokens,
                        "phoneNumber": "{{Contact.Attribute.TEST_FREEWAY_oportunidades_en_proceso_Whatsapp.Phone}}",
                        "emailAddress": "{{InteractionDefaults.email}}",
                        "clientName": "{{Contact.Attribute.TEST_FREEWAY_oportunidades_en_proceso_Whatsapp.Name}}",
                        "Enlace":"https://cloud.mkcloud.grupopurdy.com/Control_de_Calidad?numCon=" + "{{Contact.Attribute.TEST_FREEWAY_oportunidades_en_proceso_Whatsapp.[Opportunity:Numero_Consecutivo__c]}}",
                        "templateId": templateId
                    }];
                }  
        
        payload['metaData'].isConfigured = true;

        console.log(payload);
        connection.trigger('updateActivity', payload);
    }


});
