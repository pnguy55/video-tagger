const sgMail = require('@sendgrid/mail');
const SENDGRID_KEY = process.env.SENDGRID_KEY;

sgMail.setApiKey(SENDGRID_KEY);

const sendWelcomeEmail = (email, firstName) => {
    sgMail.send({
        to: email,
        from: 'codephony@codephony.com',
        subject: 'Thanks for using My Video Tagger! - CodePhony',
        html: `
        <h5>Hi ${firstName}!</h5>
        <p>
            Thank you so much for using My Video Tagger, please remember that you can always go to 
            your dashboard to look at tag lists you've already made :)

            Best wishes!
            Code Phony

            PS: If you found my tool helpful, plz consider subscribing to my Youtube Channel for more valuable content
            <a href='https://www.youtube.com/channel/UCIw9p-0zI1rEPEs_SS6fDkg?sub_confirmation=1' >Subscribe to CodePhony</a>
        </p>
        `
    })
}

module.exports =  sendWelcomeEmail;