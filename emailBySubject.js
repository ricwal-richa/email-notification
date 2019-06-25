const stampit = require('@stamp/it');
const MailosaurClient = require('mailosaur');
const client = new MailosaurClient(process.env.MAILOSAUR_API_KEY);

/* confirm email notification received by matching the email subject.
 */
const emailBySubject = stampit({
    methods: {
        async getEmailSubject( emailId, cta ) {
            var email = await client.messages.waitFor(process.env.MAILOSAUR_SERVER_ID, {
                sentTo: emailId
            });
            let targetSubject;
            if ( email ) {
                var subject = email.subject;
                if(subject.includes( cta )) {
                    targetSubject = subject;
                }
            } else {
                targetSubject = null;
            }
            return targetSubject;
        }
    }
});

module.exports = emailBySubject;
