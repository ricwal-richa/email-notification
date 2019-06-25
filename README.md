## email-notification:

This is a npm module to search for emails sent to mailosaur mail server - by Subject and Links (in email html). 

## Install:
```
npm install email-notification
```
## Environment Variables:
Set following environment variables on your machine/CI variables/.env:
```
MAILOSAUR_API_KEY = api key for your mailosaur account
MAILOSAUR_SERVER_ID = server id for your mailosaur account
```

## Usage:

Sample usage example from a UI solution page object and its calling in test:

### eMail by Subject in page object:

```
const email = require('email-notification');
const emailSubject = email.emailBySubject();
```
> This method would return the subject for matching email  
```
async emailConfirmation(completeEmailAddress, searchByText) {
    await emailSubject.getEmailSubject(completeEmailAddress, searchByText);             
}
```
> calling from test (search by subject-text)
```
await page.emailConfirmation('leancat.1234abcd@mailosaur.io', 'Reset your password'); 
```

### eMail by Link in page object:

```
const email = require('email-notification');
const emailLink = email.emailByLink();
```
> This method would return the link from matching email      
```
async emailConfirmation(completeEmailAddress, searchByLinkHref) {
    await emailLink.getEmailData(completeEmailAddress, searchByLinkHref);          
}
```
> calling from test ( search by link href in email)
```
await page.emailConfirmation('leancat.1234abcd@mailosaur.io', 'mailto:marketing@npmjs.com'); 
```