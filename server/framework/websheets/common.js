
// Items that need to be move to config file
rootUrl                 = function(orgname)
                          {
                            return Meteor.settings.private[orgname].rootUrl;
                          };
                          
isPaymentEnabled        = function(orgname)
                          {
                            if('ENABLED' === Meteor.settings.public[orgname].onlinePayment.toUpperCase())
                              return 'yes';
                          };

isPaymentStripe         = function(orgname) 
                          {
                              if('STRIPE' === Meteor.settings.public[orgname].paymentProcessor.toUpperCase())
                              {
                                  return true;
                              }
                              else
                              {
                                  return false;
                              }
                          };

isPaymentSquare         = function(orgname) 
                          {
                              if('SQUARE' === Meteor.settings.public[orgname].paymentProcessor.toUpperCase())
                              {
                                  return true;
                              }
                              else
                              {
                                  return false;
                              }
                          };

isPaymentBrainTree      = function(orgname) 
                          {
                              if('BRAINTREE' === Meteor.settings.public[orgname].paymentProcessor.toUpperCase())
                              {
                                  return true;
                              }
                              else
                              {
                                  return false;
                              }
                          };

stripePrivateKey        = function(orgname)
                          {
                            return Meteor.settings.private[orgname].stripe. privateKey;
                          };

stripeApiVersion        = function(orgname)
                          {
                            return Meteor.settings.private[orgname]. stripe. apiVersion;
                          };

isSmsEnabled            = function(orgname)
                          {
                            if('ENABLED' === Meteor.settings.private[orgname].sms.toUpperCase())
                            {
                              return true;
                            }
                            else
                            {
                              return false;
                            }
                          };

isSmsWebmaster        = function(orgname)
                          {
                            if('ENABLED' === Meteor.settings.private[orgname].smsWebmaster.toUpperCase())
                            {
                              return true;
                            }
                            else
                            {
                              return false;
                            }
                          };

webmasterPhoneNumberText= function(orgname)
                          {
                            return Meteor.settings.private[orgname]. smsWebmaterPhoneNumber;
                          };

isSmsClient             = function(orgname)
                          {
                            if('ENABLED' === Meteor.settings.private[orgname].smsClient.toUpperCase())
                            {
                              return true;
                            }
                            else
                            {
                              return false;
                            }
                          };
 isSmsCustomer             = function(orgname)
                          {
                            if('ENABLED' === Meteor.settings.private[orgname].smsCustomer.toUpperCase())
                            {
                              return true;
                            }
                            else
                            {
                              return false;
                            }
                          };                         

//clientPhoneNumberText    = function(orgname)
//                           { 
//                                return Meteor.settings.private[orgname]. smsClientPhoneNumber;
//                           };  


isSmsTwilio             =  function(orgname)
                           {

                            if('TWILIO' === Meteor.settings.private[orgname].smsProcessor.toUpperCase())
                            {
                              return true;
                            }
                            else
                            {
                              return false;
                            }

                           };

twilioAccountSID      = function(orgname)
                        {
                            return Meteor.settings.private[orgname].twilio.accountSID;
                        }
twilioAuthToken       = function(orgname)
                        {
                            return Meteor.settings.private[orgname].twilio.authToken;
                        }
twilioFromPhoneNumber = function(orgname)
                        {
                            return Meteor.settings.private[orgname].twilio.phoneNumber;
                        }

isEmailEnabled          = function(orgname)
                          {
                            if('ENABLED' === Meteor.settings.private[orgname].email.toUpperCase())
                            {
                              return true;
                            }
                            else
                            {
                              return false;
                            }
                          };

isEmailMailgun          = function(orgname) 
                          {
                              if('MAILGUN' === Meteor.settings.private[orgname].emailProcessor.toUpperCase())
                              {
                                  return true;
                              }
                              else
                              {
                                  return false;
                              }
                          };

mailGunApiKey         = function(orgname)
                        {
                            return Meteor.settings.private[orgname].mailgun.apiKey;
                        }
mailGunDomain         = function(orgname)
                        {
                            return Meteor.settings.private[orgname].mailgun.domainName;
                        }

isEmailSendgrid         = function(orgname) 
                          {
                              if('SENDGRID' === Meteor.settings.private[orgname].emailProcessor.toUpperCase())
                              {
                                  return true;
                              }
                              else
                              {
                                  return false;
                              }
                          };


fromEmailAddress        = function(orgname)
                          {
                              return Meteor.settings.private[orgname].emailFromAddress;
                          }

isClientEmailOrderReceived  = function(orgname)
                              {
                                if('ENABLED' === Meteor.settings.private[orgname].emailClient.toUpperCase())
                                {
                                  return true;
                                }
                                else
                                {
                                  return false;
                                }
                              };
clientEmailAddress          = function(orgname)
                          {
                              return Meteor.settings.private[orgname].emailClientAddress;
                          }

webmasterEmailAddress   = function(orgname)
                          {
                              return Meteor.settings.private[orgname].emailWebmasterAddress;
                          }
isEmailWebmaster        = function(orgname)
                          {
                            if('ENABLED' === Meteor.settings.private[orgname].emailWebmaster.toUpperCase())
                            {
                              return true;
                            }
                            else
                            {
                              return false;
                            }
                          };    

isEmailCustomer       = function(orgname)
                          {
                            if('ENABLED' === Meteor.settings.private[orgname].emailCustomer.toUpperCase())
                            {
                              return true;
                            }
                            else
                            {
                              return false;
                            }
                          };                                               


isOrderSystemEnabled    = function(orgname)
                          {
                            if('ENABLED' === Meteor.settings.private[orgname].orderSystem.toUpperCase())
                            {
                              return true;
                            }
                            else
                            {
                              return false;
                            }
                          };     


isOrderSystemClover     = function(orgname) 
                          {
                              if('CLOVER' === Meteor.settings.public[orgname].orderProcessor.toUpperCase())
                              {
                                  return true;
                              }
                              else
                              {
                                  return false;
                              }
                          };
isOrderSystemSquare	    = function(orgname) 
                          {
                              if('SQUARE' === Meteor.settings.public[orgname].orderProcessor.toUpperCase())
                              {
                                  return true;
                              }
                              else
                              {
                                  return false;
                              }
                          };
isOrderSystemLightSpeed	= function(orgname) 
                          {
                              if('LIGHTSPEED' === Meteor.settings.public[orgname].orderProcessor.toUpperCase())
                              {
                                  return true;
                              }
                              else
                              {
                                  return false;
                              }
                          };

isPrinterEnabled		    = function(orgname)
                          {
                            if('ENABLED' === Meteor.settings.private[orgname].printer.toUpperCase())
                            {
                              return true;
                            }
                            else
                            {
                              return false;
                            }
                          };            

gmtOffset              = function(orgname)
                          {
                            return  Meteor.settings.public[orgname].gmtOffset;
                          };

orgCountryCode          = function(orgname)
                          {
                            return  Meteor.settings.public[orgname].countryCode;
                          };                          

websheetsUrl          = function(orgname)
                          {
                            return  Meteor.settings.private[orgname].websheetsUrl;
                          };

orgCurrencyCode       = function(orgname)
                        {
                            return  Meteor.settings.public[orgname].currencyCode;
                        }; 

statusDescription = function (StatusCode) 
{
  switch (StatusCode)
  {
      case websheets.public.orderStateCode.ONE:

          return websheets.public.orderState.ONE;
          break;

      case websheets.public.orderStateCode.TWO:

          return websheets.public.orderState.TWO;
          break;

      case websheets.public.orderStateCode.THREE:

          return websheets.public.orderState.THREE;
          break;

      case websheets.public.orderStateCode.FOUR:

          return websheets.public.orderState.FOUR;
        break;
  }

}      


  getSetting = function(key, orgname)
  {
      //console.log('getSetting: Key = ' + key );
      //console.log('getSetting: orgname = ' + orgname );

      var settings = Settings.findOne({Key: key, orgname:orgname});
      if(settings)
      {
        //console.log('getSetting: value = ' + settings.Value );
        return settings.Value;
      }
      else
      {
        return;
      }
  }



Meteor.methods({

  getSetting:function(key, orgname)
  {
  		//console.log('getSetting: Key = ' + key );
      //console.log('getSetting: orgname = ' + orgname );

  		var settings = Settings.findOne({Key: key, orgname:orgname});
  		if(settings)
  		{
  			//console.log('getSetting: value = ' + settings.Value );
  			return settings.Value;
  		}
  		else
  		{
  			return;
  		}
  },
  getAppSettings:function(key, orgname)
  {
  	  	//console.log('getAppSettings: Key = ' + key );
        //console.log('getSetting: orgname = ' + orgname );
  	  	var appSettings= AppSettings.findOne({Key: key, orgname:orgname});
  		if(settings)
  		{
  			//console.log('getAppSettings: value = ' + appSettings.Value );
  			return appSettings.Value;
  		}
  		else
  		{
  			return;
  		}

  },


  getLocalTime:function(orgname)
  {

      return moment().utcOffset(gmtOffset(orgname)).format('MM/DD/YYYY hh:mm:ss A');

  }


});