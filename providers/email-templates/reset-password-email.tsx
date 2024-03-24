import * as React from 'react';

interface ResetPasswordEmailTemplateProps {
    email: string;
    resetPasswordToken: string;
}

export const ResetPasswordEmailTemplate: React.FC<Readonly<ResetPasswordEmailTemplateProps>> = ({ email, resetPasswordToken }) => {
    const htmlTemplate = `
    <!DOCTYPE html>
    <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css"><!--<![endif]-->
        <style>
            * {
                box-sizing: border-box;
            }
    
            body {
                margin: 0;
                padding: 0;
            }
    
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: inherit !important;
            }
    
            #MessageViewBody a {
                color: inherit;
                text-decoration: none;
            }
    
            p {
                line-height: inherit
            }
    
            .desktop_hide,
            .desktop_hide table {
                mso-hide: all;
                display: none;
                max-height: 0px;
                overflow: hidden;
            }
    
            .image_block img+div {
                display: none;
            }
    
            @media (max-width:670px) {
                .social_block.desktop_hide .social-table {
                    display: inline-block !important;
                }
    
                .image_block div.fullWidth {
                    max-width: 100% !important;
                }
    
                .mobile_hide {
                    display: none;
                }
    
                .row-content {
                    width: 100% !important;
                }
    
                .stack .column {
                    width: 100%;
                    display: block;
                }
    
                .mobile_hide {
                    min-height: 0;
                    max-height: 0;
                    max-width: 0;
                    overflow: hidden;
                    font-size: 0px;
                }
    
                .desktop_hide,
                .desktop_hide table {
                    display: table !important;
                    max-height: none !important;
                }
            }
        </style>
    </head>
    
    <body style="background-color: #000000; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000;">
            <tbody>
                <tr>
                    <td>
                        <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; background-size: auto;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto; background-color: #ffffff; color: #000000; width: 650px; margin: 0 auto;" width="650">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 45px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                        <table class="divider_block block-1" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div class="alignment" align="center">
                                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tr>
                                                                                <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="image_block block-2" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div class="alignment" align="center" style="line-height:10px">
                                                                        <div class="fullWidth" style="max-width: 357.5px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/2971/lock5.png" style="display: block; height: auto; border: 0; width: 100%;" width="357.5" alt="Forgot your password?" title="Forgot your password?"></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="heading_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad" style="padding-top:35px;text-align:center;width:100%;">
                                                                    <h1 style="margin: 0; color: #1c00a6; direction: ltr; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 25px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 30px;"><strong><span style="color: #000000;">Hey</span> ${email}<br><span style="color: #000000;">Forgot your password?</span></strong></h1>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                            <tr>
                                                                <td class="pad" style="padding-left:45px;padding-right:45px;padding-top:10px;">
                                                                    <div style="color:#000000;font-family:'Cabin',Arial,'Helvetica Neue',Helvetica,sans-serif;font-size:18px;line-height:150%;text-align:center;mso-line-height-alt:27px;">
                                                                        <p style="margin: 0; word-break: break-word;"><span style="color: #000000;">We received a request to reset your password.</span></p>
                                                                        <p style="margin: 0; word-break: break-word;"><span style="color: #000000;">If you didn't make this request, simply ignore this email.</span></p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="divider_block block-5" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div class="alignment" align="center">
                                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="80%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tr>
                                                                                <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #E1B4FC;"><span>&#8202;</span></td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="paragraph_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                            <tr>
                                                                <td class="pad" style="padding-bottom:10px;padding-left:45px;padding-right:45px;padding-top:10px;">
                                                                    <div style="color:#393d47;font-family:'Cabin',Arial,'Helvetica Neue',Helvetica,sans-serif;font-size:13px;line-height:150%;text-align:left;mso-line-height-alt:19.5px;">
                                                                        <p style="margin: 0; word-break: break-word;"><span style="color: #000000;">If you did make this request just click the button below:</span></p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="button_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div class="alignment" align="center"><!--[if mso]>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://rdrdc-prod.vercel.app/reset-password?token=${resetPasswordToken}" style="height:54px;width:225px;v-text-anchor:middle;" arcsize="0%" strokeweight="0.75pt" strokecolor="#1c00a6" fillcolor="#1c00a6">
    <w:anchorlock/>
    <v:textbox inset="0px,0px,0px,0px">
    <center style="color:#ffffff; font-family:Arial, sans-serif; font-size:14px">
    <![endif]--><a href="https://rdrdc-prod.vercel.app/reset-password?token=${resetPasswordToken}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#1c00a6;border-radius:0px;width:auto;border-top:1px solid transparent;font-weight:400;border-right:1px solid transparent;border-bottom:1px solid transparent;border-left:1px solid transparent;padding-top:10px;padding-bottom:10px;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:40px;padding-right:40px;font-size:14px;display:inline-block;letter-spacing:normal;"><span style="word-break:break-word;"><span style="line-height: 28px;" data-mce-style>RESET MY PASSWORD</span></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="paragraph_block block-8" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                            <tr>
                                                                <td class="pad" style="padding-bottom:20px;padding-left:10px;padding-right:10px;padding-top:10px;">
                                                                    <div style="color:#8412c0;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                                                        <p style="margin: 0; word-break: break-word;"><span style="color: #000000;">RD Realty Development Corporation © · <a href="http://[unsubscribe]/" target="_blank" rel="noopener" style="color: #8412c0;">2</a>024</span></p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px; margin: 0 auto;" width="650">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 10px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                        <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div style="color:#8412c0;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:11px;line-height:120%;text-align:center;mso-line-height-alt:13.2px;">
                                                                        <p style="margin: 0; word-break: break-word;"><span><span style="color: #000000;">RD Realty Development Corporation | General Santos Business Park, General Santos City, 9500, Philippines</span><a href="http://www.example.com" style="color: #8412c0;"></a></span></p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div style="color:#8412c0;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:12px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
                                                                        <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="social_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div class="alignment" align="center">
                                                                        <table class="social-table" width="72px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                                                            <tr>
                                                                                <td style="padding:0 2px 0 2px;"><a href="https://www.facebook.com/RDRealtyGensan" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/facebook@2x.png" width="32" height="32" alt="Facebook" title="facebook" style="display: block; height: auto; border: 0;"></a></td>
                                                                                <td style="padding:0 2px 0 2px;"><a href="mailto:support@rdrealty.com.ph" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/mail@2x.png" width="32" height="32" alt="E-Mail" title="E-Mail" style="display: block; height: auto; border: 0;"></a></td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table><!-- End -->
    </body>
    
    </html>
    `;

    return <div dangerouslySetInnerHTML={{ __html: htmlTemplate }} />;
};