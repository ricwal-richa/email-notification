const stampit = require('@stamp/it');
const MailosaurClient = require('mailosaur');
const client = new MailosaurClient(process.env.MAILOSAUR_API_KEY);

/* confirm email notification received by matching the email link text.
 */

const emailByLink = stampit({
    methods: {
        async getEmailData( emailId, cta )  {
            var email = await client.messages.waitFor(process.env.MAILOSAUR_SERVER_ID, {
                sentTo: emailId
            });
            let ctaLink;
            if (email) {
                var links = email.html.links;  
                var targetLinks = links.filter(function( linkObj, cta ) {
                    if (linkObj && linkObj.text && linkObj.text.indexOf(cta) !== -1) {
                        return linkObj;
                    } else {
                        return null;
                    }
                });
                ctaLink = targetLinks && targetLinks.length && targetLinks[0].href;
            } else {
                ctaLink = null;
            }
            return ctaLink;
        }
    }
});

module.exports = emailByLink;
