export const sendOTP_Email_Template = (firstName: string, otpCode: string) => ({
  text: `
              Hi ${firstName},
            
              Your verification/confirmation code is :   ${otpCode} 
                `,
  html: `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="x-apple-disable-message-reformatting">
   <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
   <title>Frame 537</title>
   <link href="https://fonts.googleapis.com/css?family=Lato:500&display=swap&subset=cyrillic" rel="stylesheet">
   <!--[if mso]>
              <style>
                  * {
                      font-family: sans-serif !important;
                  }
              </style>
          <![endif]-->
   <!--[if !mso]><!-->
   <!-- <![endif]-->
   <style>
    html {
        margin: 0 !important;
        padding: 0 !important;
    }
        
    * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
    }
        
    
    td {
        vertical-align: top;
        mso-table-lspace: 0pt !important;		
        mso-table-rspace: 0pt !important;
    }
    
        
    a {
        text-decoration: none;
    }
        
    
    img {
        -ms-interpolation-mode:bicubic;
    }
        
        
        
    
    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
            min-width: 320px !important;
        }
    }
    
    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
            min-width: 375px !important;
        }
    }
    
    @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
            min-width: 414px !important;
        }
    }
        
   </style>
   <!--[if gte mso 9]>
          <xml>
              <o:OfficeDocumentSettings>
                  <o:AllowPNG/>
                  <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
   <style>
    @media only screen and (max-device-width: 479px), only screen and (max-width: 479px) {
    
        .eh {
            height:auto !important;
        }
    
        .desktop {
            display: none !important;
            height: 0 !important;
            margin: 0 !important;
            max-height: 0 !important;
            overflow: hidden !important;
            padding: 0 !important;
            visibility: hidden !important;
            width: 0 !important;
        }
        
        .mobile {
            display: block !important;
            width: auto !important;
            height: auto !important;
            float: none !important;
        }
            
            
            .email-container {
                width: 100% !important;
                margin: auto !important;
            }
        
            
            .stack-column,
            .stack-column-center {
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                direction: ltr !important;
            }
            
            .stack-column-center {
                text-align: center !important;
            }
        
            
            .center-on-narrow {
                text-align: center !important;
                display: block !important;
                margin-left: auto !important;
                margin-right: auto !important;
                float: none !important;
            }
            table.center-on-narrow {
                display: inline-block !important;
            }
    
        }
        
   </style>
  </head>
  
  <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly;">
   <div style="background-color:#e5e5e5;">
    <!--[if gte mso 9]>
                                  <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                                  <v:fill type="tile" color="#e5e5e5"/>
                                  </v:background>
                                  <![endif]-->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
     <tr>
      <td style="background-color:#e5e5e5;border-collapse:separate !important;" valign="top" align="center">
       <div id="preview_text" style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;"> Email Verification </div>
       <!-- Visually Hidden Preheader Text : END -->
       <!-- Preview Text Spacing Hack : BEGIN -->
       <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;"> &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp; </div>
       <table bgcolor="#ffffff" style="margin: 0 auto;" align="center" id="brick_container" cellspacing="0" cellpadding="0" border="0" width="480" class="email-container">
        <tr>
         <td>
          <table align="center" cellspacing="0" cellpadding="0" border="0">
           <tr>
            <td width="480" style="border-collapse:separate !important;">
             <table cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
               <td>
                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                 <tr>
                  <td>
                   <table align="center" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                     <td>
                      <img src="https://cjtronics-images.s3.us-east-2.amazonaws.com/email-templates/background.png" width="480" alt="" border="0" style=" border-radius:0px; width: 100%; height: auto; margin: auto; display: block;">
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
              <tr>
               <td>
                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                 <tr>
                  <td>
                   <table align="center" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                     <td>
                      <img src="https://cjtronics-images.s3.us-east-2.amazonaws.com/email-templates/logo.png" width="160" alt="" border="0" style="max-width:160px; height:auto;margin:auto;display:block;">
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
                <div style="height:24px;line-height:24px;font-size:24px;">&nbsp;</div>
               </td>
              </tr>
             </table>
            </td>
           </tr>
          </table>
         </td>
        </tr>
        <tr>
         <td>
          <table align="center" cellspacing="0" cellpadding="0" border="0">
           <tr>
            <td width="480" style="border-collapse:separate !important;">
             <table cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
               <td>
                <div style="height:40px;line-height:40px;font-size: 40px; ">&nbsp;</div>
                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                 <tr>
                  <td style=" text-align:center;">
                   <div style="line-height:32px"><span style="color: #575c61;line-height:32px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:24px;text-align:center;font-weight: 700;">Email Verification</span></div>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
              <tr>
               <td>
                <div style="height:24px;line-height:24px;font-size: 24px; ">&nbsp;</div>
                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                 <tr>
                  <td style="padding-left:32px;padding-right:32px; text-align:left;">
                   <div style="line-height:20px"><span style="color: #575c61;line-height:20px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">  Hi ${firstName}, <br> <br>

                    Your Bits verification/confirmation code is:   <br><br> 
                    
                    <b>${otpCode}</b>
                </span></div>
                  </td>
                 </tr>
                </table>
                <div style="height:16px;line-height:16px;font-size:16px;">&nbsp;</div>
               </td>
              </tr>
              <tr>
                <td>
                 <div style="height:24px;line-height:24px;font-size: 24px; ">&nbsp;</div>
                 <table cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                   <td style="padding-left:32px;padding-right:32px; text-align:left;">
                    <div style="line-height:20px"><span style="color: #575c61;line-height:20px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">


Please do not share this code with anyone.
</span></div>
                   </td>
                  </tr>
                 </table>
                 <div style="height:16px;line-height:16px;font-size:16px;">&nbsp;</div>
                </td>
               </tr>
             </table>
            </td>
           </tr>
          </table>
         </td>
        </tr>
        <tr>
         <td>
          <div style="height:0px;line-height:0px;font-size: 0px; ">&nbsp;</div>
         </td>
        </tr>
        <tr>
         <td>
          <table align="center" cellspacing="0" cellpadding="0" border="0">
           <tr>
            <td width="480" style="border-collapse:separate !important;">
             <table cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
               <td>
                <div style="height:8px;line-height:8px;font-size: 8px; ">&nbsp;</div>
               </td>
              </tr>
              <tr>
               <td>
                <div style="height:8px;line-height:8px;font-size: 8px; ">&nbsp;</div>
               </td>
              </tr>
              <tr>
               <td>
                <div style="height:16px;line-height:16px;font-size:16px;">&nbsp;</div>
               </td>
              </tr>
             </table>
            </td>
           </tr>
          </table>
         </td>
        </tr>
        <tr>
         <td>
          <table align="center" cellspacing="0" cellpadding="0" border="0">
           <tr>
            <td width="480" style="border-collapse:separate !important;">
             <table cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
               <td>
                <div style="height:8px;line-height:8px;font-size: 8px; ">&nbsp;</div>
               </td>
              </tr>
              
              <tr>
               <td>
                <div style="height:8px;line-height:8px;font-size:8px;">&nbsp;</div>
               </td>
              </tr>
             </table>
            </td>
           </tr>
          </table>
         </td>
        </tr>
        <tr>
        </tr>
        
        
       </table>
      </td>
     </tr>
    </table>
   </div>
  </body>
  
  </html>
            
                `,
});
