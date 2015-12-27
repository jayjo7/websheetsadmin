//var secret = Meteor.settings.private.stripe.testSecretKey;
    var Future = Npm.require('fibers/future');
    var Fiber  = Npm.require('fibers');
    var client;

Meteor.methods({

    smsOrderReceived :function (order, toPhoneNumber, whoReceiving)
    {

        client = Meteor.npmRequire('twilio')(twilioAccountSID(order.orgname), twilioAuthToken (order.orgname));
        var response = {};
        var CLIENT_NAME;
        var body ;

        switch (whoReceiving)
        {

          case websheets.private.generic.CLIENT:

          case websheets.private.generic.WEBMASTER:
                body      = 'New Order[' + order.OrderNumber + '] \n';
                body     += order.Items + '\n';
                body     += rootUrl(order.orgname) +'/osm/'+ order.UniqueId;

              break;

          default:
            
                CLIENT_NAME           = Meteor.call('getSetting','store_name', order.orgname);
                console.log(order.sessionId + ': smsOrderReceived: CLIENT_NAME = ' +CLIENT_NAME); 
                
                body      = 'Received Order[' + order.OrderNumber + '] \n';
                body     += order.Items + '\n';
                body     += ' - ' + CLIENT_NAME + ' \n' ;
                body     +=   rootUrl(order.orgname) +'/os/'+ order.UniqueId;

        }

        try{
          var result = sendSMS (  
                    order.sessionId,
                    order.OrderNumber,
                    toPhoneNumber, 
                    body,
                    order.orgname
                  );

         response.result = result;

        for(var key in response.result)
        {
              console.log(order.sessionId +": smsOrderReceived : " +key + ' = ' + response.result[key]);
              //smsCustomer[key] = response.result[key];
        }

        }catch(e)
        {

          console.log(order.sessionId +': smsOrderReceived : Trouble sending sms to the customer ' + e);
          var result ={};
          result.status = websheets.public.status.FATAL;
          result.error = e.toString();
          response.result = result;

        }

        return response;

    },



    smsOrderReady:function (sessionId, order, toPhoneNumber, whoReceiving)
    {
        client                = Meteor.npmRequire('twilio')(twilioAccountSID(order.orgname), twilioAuthToken (order.orgname));
        var response          = {};
        CLIENT_NAME           = Meteor.call('getSetting','store_name', order.orgname);
        var body              = 'Order[' +order.OrderNumber + '] is ready - ' + CLIENT_NAME + '\n' + rootUrl(order.orgname)+'/os/'+ order.UniqueId;


        try{
          var result = sendSMS (  
                    sessionId,
                    order.OrderNumber,
                    toPhoneNumber, 
                    body,
                    order.orgname
                  );

         response.result = result;

        for(var key in response.result)
        {
              console.log(sessionId +": smsOrderReady : " +key + ' = ' + response.result[key]);
              //smsCustomer[key] = response.result[key];
        }

        }catch(e)
        {

          console.log(sessionId +': smsOrderReady : Trouble sending sms to the customer ' + e);
          var result      = {};
          result.status   = websheets.public.status.FATAL;
          result.error    = e.toString();
          response.result = result;

        }

        return response;



    }

});

var sendSMS = function (sessionId, orderNumber, toPhoneNumber, bodyMessage, orgname) {

    var orgTwilioFromPhoneNumber = twilioFromPhoneNumber(orgname);
    console.log(sessionId +": sendSMS : twilioAccountSID          = "   +  twilioAccountSID(orgname) );
    console.log(sessionId +": sendSMS : twilioAuthToken           = "   +  twilioAuthToken(orgname));
    console.log(sessionId +": sendSMS : orgTwilioFromPhoneNumber  = "   +  orgTwilioFromPhoneNumber);
    console.log(sessionId +": sendSMS : toPhoneNumber             = "   +  toPhoneNumber);
    console.log(sessionId +": sendSMS : bodyMessage               = "   +  bodyMessage);
    //var toPhoneNumberE164 = Phoneformat.formatE164('US', '4257776970');
    //var toPhoneNumberE164           = Phoneformat.formatE164(countryCode( orgname), toPhoneNumber);
    //console.log(sessionId +": sendSMS : toPhoneNumberE164      = "   +  toPhoneNumberE164);
    //var countryCode = orgCountryCode( orgname);
    //console.log(sessionId +": sendSMS : countryCode      = "   +  countryCode);


    //var toPhoneNumberE164           = Phoneformat.formatE164(countryCode, toPhoneNumber);
    //console.log(sessionId +": sendSMS : toPhoneNumberE164      = "   +  toPhoneNumberE164);

    //var twilioFromPhoneNumberE164   = Phoneformat.formatE164(countryCode, twilioFromPhoneNumber((orgname)));
    //console.log(sessionId +": sendSMS : twilioFromPhoneNumberE164  = "   +  twilioFromPhoneNumberE164);



    var result ={};

    var smsMessage = new Future();
      client.messages.create({

                          to    : toPhoneNumber, 
                          from  : orgTwilioFromPhoneNumber,
                          body  : bodyMessage

                        }, Meteor.bindEnvironment (function (error, message)
                          {

                              if(error)
                              {
                                result.status     = websheets.public.status.STATUS_FAILED;
                                result.error      = error;

                                for(var key in error)
                                  {
                                    console.log(sessionId + ": error object from sms: " + key + " = " + error[key]);
                        
                                  }
                                console.log(sessionId + " : Done Invoking sms - Yes Error");
                        

                              }
                              else
                              {
                                for(var key in message)
                                  {
                                    console.log(sessionId + ": message object from sms: " + key + " = " + message[key]);
                        
                                  }
                                result.status   = websheets.public.status.SUCCESS;  
                                result.message  = message;
                                console.log(sessionId + " : Done Invoking sms - No Error");

                              }
                            console.log(sessionId +": sendSMS: result = " + result)  ;
                            smsMessage.return(result);
                        }));

return smsMessage.wait();
      
}