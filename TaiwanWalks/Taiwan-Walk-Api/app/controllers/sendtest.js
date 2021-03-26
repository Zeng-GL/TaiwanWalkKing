
var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'stargraceful@gmail.com',
    pass: 'ubngryvusklssfnp' //應用程式密碼
  }
});

const sendMail = (email) =>{
  const mailOptions = {
    from: 'stargraceful@gmail.com',
    to: email,
    subject: '台灣尋寶王：找回密碼',
    text: '您的密碼是：usersPassword'
  };
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
}

module.exports = sendMail;






// const { emitWarning } = require('process');
// module.exports = app => {



//   app.post('/send', function (req, res) {


//     const sendMail = () => {
//       var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'stargraceful@gmail.com',
//           pass: 'ubngryvusklssfnp' //應用程式密碼
//         }
//       });

//       var mailOptions = {
//         from: 'stargraceful@gmail.com',
//         to: req.body,
//         subject: '找回密碼',
//         text: '您的密碼是：usersPassword'
//       };
//     }
//     res.end();
//   });
// }