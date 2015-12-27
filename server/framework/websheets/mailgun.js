
 var sendEmail;

Meteor.methods({

    emailOrderReady:function (sessionId, order, whoReceiving)
    {

      initializeMailGun(order.orgname);
      var response      = {};
      response.status   = websheets.public.status.SUCCESS;
      var body          = buildOrderReadyBody(sessionId, order);
      var toEmailAddress;
      var subject     = 'Your Order [' + order.OrderNumber  + '] is ready.';

      switch (whoReceiving)
      {

          case websheets.private.generic.WEBMASTER:
                toEmailAddress      = webmasterEmailAddress (order.orgname);
                break;

          default:
            
                toEmailAddress  =  order.CustomerEmail;


      }

              //Send Email to customer
        try{
            var result = sendEmail.send({
                                     'to'     :   toEmailAddress,
                                     'from'   :   fromEmailAddress(order.orgname),
                                     'text'   :   body,
                                     'subject':   subject

                                 });
            response.result = result;
              
            console.log(sessionId +": emailOrderReady : result received from vendor: " +JSON.stringify(response.result, null, 4));

                       
        }catch(e)
        {
          console.log(sessionId + ': emailOrderReady: Trouble sending email to the customer' + e);
          var result ={};
          result.status = websheets.public.status.FATAL;
          result.error = e.toString();
          response.result = result;
        }

      return response;  


    },

    sendCCAuthFailedNotification:function(order)
    {
        initializeMailGun(order.orgname);
        var response      =   {};
        response.status   =   websheets.public.status.SUCCESS;
        var CLIENT_NAME   =   Meteor.call('getSetting','store_name', order.orgname);
        var subject       =   'Credit Card declined - ' + CLIENT_NAME ; 
        var body          =   Meteor.call('getSetting','order_status_alert_message' , order.orgname) + '\n\n' + buildOrderReceivedBody(order);

        //Send Email to customer
        try{
            var result = sendEmail.send({
                                     'to'     :   order.CustomerEmail,
                                     'from'   :   fromEmailAddress(order.orgname) ,
                                     'bcc'    :   clientEmailAddress (order.orgname),
                                     'text'   :   body,
                                     'subject':   subject

                                 });
            response.result = result;
            console.log(order.sessionId +": emailOrderReceived : result received from vendor: " +JSON.stringify(response.result, null, 4));

        }catch(e)
        {
          console.log('sendCCAuthFailedNotification: Trouble sending email to the customer' + e);
          var result ={};
          result.status = websheets.public.status.FATAL;
          result.error = e.toString();
          response.result = result;
        }

      return response;
    },

    emailOrderReceived : function(order, whoReceiving)
    {

      initializeMailGun(order.orgname);
      var response      = {};
      response.status   = websheets.public.status.SUCCESS;
      var body;
      var toEmailAddress;
      var subject;

      switch (whoReceiving)
      {

          case websheets.private.generic.CLIENT:
              toEmailAddress      = clientEmailAddress (order.orgname);
              var CLIENT_NAME     = Meteor.call('getSetting','store_name' , order.orgname);
              subject             = 'Owner ' +  CLIENT_NAME+': Received Order [' + order.OrderNumber + ']';
              body                = buildOrderReceivedBody(order, 'osm');

              break;

          case websheets.private.generic.WEBMASTER:
              toEmailAddress      = webmasterEmailAddress (order.orgname);
              var CLIENT_NAME     = Meteor.call('getSetting','store_name' , order.orgname);
              subject             = 'Owner ' +  CLIENT_NAME+': Received Order [' + order.OrderNumber + ']';
              body                = buildOrderReceivedBody(order, 'osm');

              break;

          default:
            
              subject             = 'Your Order [' + order.OrderNumber + ']';
              body                = buildOrderReceivedBody(order, 'os');
              toEmailAddress      =  order.CustomerEmail;


      }

              //Send Email to customer
        try{
            var result = sendEmail.send({
                                     'to'     :   toEmailAddress,
                                     'from'   :   fromEmailAddress(order.orgname),
                                     'text'   :   body,
                                     'subject':   subject

                                 });
            response.result = result;
              
            console.log(order.sessionId +": emailOrderReceived : result received from vendor: " +JSON.stringify(response.result, null, 4));

                       
        }catch(e)
        {
          console.log('emailOrderReceived: Trouble sending email to the customer' + e);
          var result ={};
          result.status = STATUS_FATAL;
          result.error = e.toString();
          response.result = result;
        }

      return response;  


    },


});

var initializeMailGun = function(orgname)
{
          var options = {
          apiKey: mailGunApiKey(orgname),
          domain: mailGunDomain(orgname)
          }
        //console.log("initializeMailGun : options: " +JSON.stringify(options, null, 4));

        sendEmail = new Mailgun(options);

}



var buildOrderReceivedBody = function(order, urlPath)
{

    var CLIENT_PHONE_NUMBER   = Meteor.call('getSetting', 'phone_number'  , order.orgname);
    //console.log('buildOrderReceivedBody: CLIENT_PHONE_NUMBER = ' +CLIENT_PHONE_NUMBER);
    var CLIENT_ADDRESS        = Meteor.call('getSetting', 'address' , order.orgname);
    //console.log('buildOrderReceivedBody: CLIENT_ADDRESS = ' +CLIENT_ADDRESS);    
    var CLIENT_NAME           = Meteor.call('getSetting','store_name' , order.orgname);
    //console.log('buildOrderReceivedBody: CLIENT_NAME = ' +CLIENT_NAME);    
    var EMAIl_CUSTOM_MESSAGE     = Meteor.call('getSetting','email_custom_message' , order.orgname);
    //console.log('buildOrderReceivedBody: EMAIl_CUSTOM_MESSAGE  = ' +EMAIl_CUSTOM_MESSAGE );    
  
	  var body= order.CustomerName + ', Thank you for your order.' +'\n\n' ;

        
      body = body + 'Your Order # [' + order.OrderNumber + ']\n\n';
      body = body + 'You Ordered:'+ '\n\n';
      
      body = body + order.Items + '\n\n';
      
      body = body + '--------------------------'+ '\n';
      body = body + 'Total with tax = $'+ order.Total + '\n';
      body = body + '--------------------------'+ '\n\n';
      
      body = body + 'Call us at: ' + CLIENT_PHONE_NUMBER +', if you need to change your order.' + '\n\n';
      
      
      body = body + 'Pickup Address:'+ '\n\n';
      
      
      //body = body + CLIENT_ADDRESS_LINE1 + '\n';
      //body = body + CLIENT_ADDRESS_LINE2+ '\n\n';
      body = body + CLIENT_ADDRESS+ '\n\n';
      body = body + 'We will email you when your order is ready for pickup'+ '\n\n';
      
      
      
      body = body + 'See you soon!'+ '\n';
      body = body + '- ' +  CLIENT_NAME + '\n';
 
       
      body = body + "\n\n";
      
      body = body + 'Check status at: \n';
      body = body + rootUrl(order.orgname) + '/'+ urlPath +'/'+ order.UniqueId;


      if(EMAIl_CUSTOM_MESSAGE)
      {
        body = body + '\n\n\n' + EMAIl_CUSTOM_MESSAGE;
      }
      
      body = body + '\n\n' + 'Auto generated, please do not reply to this email. If needed please email ' + clientEmailAddress(order.orgname);
      body = body + '\n\n' +'Powered by http://websheets.io';
      console.log(order.sessionId + ' :buildOrderReceivedBody:body = ' + body);
      return body;

}


var buildOrderReadyBody = function(sessionId,order)
{

    var CLIENT_PHONE_NUMBER   = Meteor.call('getSetting', 'phone_number'  , order.orgname);
    //console.log('buildOrderReceivedBody: CLIENT_PHONE_NUMBER = ' +CLIENT_PHONE_NUMBER);
    var CLIENT_ADDRESS        = Meteor.call('getSetting', 'address' , order.orgname);
    //console.log('buildOrderReceivedBody: CLIENT_ADDRESS = ' +CLIENT_ADDRESS);    
    var CLIENT_NAME           = Meteor.call('getSetting','store_name' , order.orgname);
    //console.log('buildOrderReceivedBody: CLIENT_NAME = ' +CLIENT_NAME);    
    var EMAIl_CUSTOM_MESSAGE     = Meteor.call('getSetting','email_custom_message' , order.orgname);
    //console.log('buildOrderReceivedBody: EMAIl_CUSTOM_MESSAGE  = ' +EMAIl_CUSTOM_MESSAGE );    

          var body= 'Your order #  [' + order.OrderNumber + '] is ready to be picked up any time now -' +'\n\n' ;
          //body = body + 'Received at : ' + order.TimeOrderReceived+ '\n\n';
          body = body + order.Items + '\n\n';
        
        
          body = body + 'Call us at: ' + CLIENT_PHONE_NUMBER +', if you need direction.' + '\n\n';
      
      
          body = body + 'Pickup Address:'+ '\n\n';
      
      
          body = body + CLIENT_ADDRESS+ '\n\n';
            

      
           body = body + 'See you soon!'+ '\n';
           body = body + '- ' +  CLIENT_NAME + '\n';
           
           body = body + "\n\n";
        
          body = body + 'Check the current status at:\n';
          body = body +  rootUrl(order.orgname) + '/os/' + order.UniqueId;
      
       if(EMAIl_CUSTOM_MESSAGE)
      {
        body = body + '\n\n\n' + EMAIl_CUSTOM_MESSAGE;
      }
      body = body + '\n\n' + 'Auto generated, please do not reply to this email. If needed please email ' + clientEmailAddress(order.orgname);
      body = body + '\n\n' +'Powered by http://websheets.io';
      console.log(sessionId + ' :buildOrderReceivedBody:body = ' + body);
      return body;

}