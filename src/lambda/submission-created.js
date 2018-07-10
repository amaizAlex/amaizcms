var request = require('request');

var api_key = 'key-6487786c4d3890bb04176893a43e89d1';
var domain = 'amaiz.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

exports.handler = function(event, context, callback) {

	var formData = JSON.parse(event.body).payload.data;
	var formPayload = JSON.parse(event.body).payload;


	if(formData.formtype === 'form-simple') {

		// send form data to Marketing Cloud
		var formDataToMC = '';
		for (var key in formData) {
			formDataToMC += key + '=' + formData[key] + '&';
		}

		formDataToMC += '_clientID=100002261&_deExternalKey=A9F2126E-50B3-4BD1-AF84-CB71A776A53F&_action=add/update&_returnXML=0&_successURL=https://amaiz.com/success/&_errorURL=https://amaiz.com/error/';

		request.post({
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url: 'https://cl.s10.exct.net/DEManager.aspx',
				body: formDataToMC
			}
		);



		// send form data to Google Sheets
		var formDataToGoogle;
		for (var key in formData) {
			formDataToGoogle += '&' + key + '=' + formData[key]
		}

		request.post({
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url: 'https://script.google.com/macros/s/AKfycbzvHYlW2m2l_gBIyESSYhlAmH3rSe68YervJPb-5D-IWAea_r6b/exec',
				body: formDataToGoogle
			}
		);
	}


	if(formData.formtype === 'form-apply') {

		var attach1, attach2, attach3;
		if(formData.file_attach1 != undefined || formData.file_atach1 != null) {
			attach1 = request(formData.file_attach1.url)
		}
		if(formData.file_attach2 != undefined || formData.file_atach2 != null) {
			attach2 = request(formData.file_attach2.url)
		}
		if(formData.file_attach3 != undefined || formData.file_atach3 != null) {
			attach3 = request(formData.file_attach3.url)
		}

		var mailData = {
		  from: 'Amaiz Site <team@amaiz.com>',
		  to: 'alexander.kazakov@amaiz.com',
		  subject: formData.vacancy,
		  html: 'Name: ' + formData.name + '<br/>Email: ' + formData.email + '<br/>Message: ' + formData.message,
		  attachment: [attach1, attach2, attach3]
		};

		mailgun.messages().send(mailData);
	}


}