function main(users){
  const sgMail = require('@sendgrid/mail');

  EmailTemplate = require('email-templates').EmailTemplate,
      path = require('path'),
  Promise = require('bluebird');

  sgMail.setApiKey('');

  //this is the main function which takes the dictionary object and sends the required mail
  function sendEmail (obj) {
    return sgMail.send(obj);
  }

  
  
  function loadTemplate (templateName, contexts) {
    let template = new EmailTemplate(path.join(__dirname, 'templates', templateName));
    return Promise.all(contexts.map((context) => {
        return new Promise((resolve, reject) => {
            template.render(context, (err, result) => {
                if (err) reject(err);
                else resolve({
                    email: result,
                    context,
                });
            });
        });
    }));
  }

  loadTemplate('withdrawal_failed', users).then((results) => {
    return Promise.all(results.map((result) => {
        sendEmail({
            to: result.context.email,
            from: 'tech@kaptain11.com',
            subject: result.email.subject,
            html: result.email.html,
            text: result.email.text,
        });
    }));
  }).then(() => {
    console.log('Yay!');
  });
}
var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes();
  var month = today.getMonth();
  var day = today.getDate();
  var year = today.getFullYear();
  if(month<10){
    month = "0"+month;
  }
  if(day<10){
    day = "0"+day;
  }
  var date = day + "/" + month + "/" + year;
let users = [
  {
    name:"Tej",
    email:"rushikesh@gmail.com",
    amount:"99",
    payment_id:"M2488OWXIE20005",
    date:date,
    time:time,
  },
]
main(users);

