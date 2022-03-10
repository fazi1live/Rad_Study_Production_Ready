const nodemailer = require("nodemailer");

const SendEmailUsingNodeMailer = async (_Email) => {
  try {
      console.log(_Email);
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // create reusable transporter object using the default SMTP transport
    const _SmtpService = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: 'scriptoneserver@outlook.com', // generated ethereal user
        pass: 'Re^m@n1!!', // generated ethereal password
      },
    });

    //Email Object

    const _EmailObject = {
      from: 'scriptoneserver@outlook.com', // sender address
      to: _Email, // list of receivers
      subject: "Skillstitute", // Subject linea
    }


    // Send Email 

    const _SendEmail = await _SmtpService.sendMail(_EmailObject);
    return {
      Message: `Important Information Has Sent Successfully from ${_SendEmail.envelope.from} To ${_SendEmail.envelope.to} Please Check Your Email!`,
      Data: _SendEmail.messageId,
      Result: _SendEmail.response
    }
  } catch (error) {
    return {
      Message: error.message,
      Data: false,
      Result: null
    }

  }

}

module.exports = { SendEmailUsingNodeMailer };