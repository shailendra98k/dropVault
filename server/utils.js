function getEmailVerifyContent(identifier) {
  return `<!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Email Verification</title>
     <style>
       body {
         font-family: Arial, sans-serif;
         background-color: #f4f4f4;
         padding: 20px;
         text-align: center;
       }
   
       .container {
         max-width: 600px;
         margin: 0 auto;
         background-color: #ffffff;
         padding: 20px;
         border-radius: 8px;
         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
       }
   
       .button {
         display: inline-block;
         padding: 10px 20px;
         background-color: #007bff;
         color: #ffffff;
         text-decoration: none;
         border-radius: 4px;
       }
     </style>
   </head>
   <body>
     <div class="container">
       <h2>Email Verification</h2>
       <p>Thank you for signing up! To complete the sign-up process, please click the button below:</p>
       <a class="button" href="${BASE_URL}/api/v1/account-verify/${identifier}">Verify Email</a>
       <p>If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
       <p><code>${BASE_URL}/api/v1/account-verify/${identifier}</code></p>
     </div>
   </body>
   </html>
   `;
}

function getVerificationSuccessContent(){
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification Success</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
        text-align: center;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 4px;
      }
  
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
  
      .success-message {
        color: #007bff;
        font-size: 18px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Email Verification Successful</h2>
      <p class="success-message">Congratulations! Your email has been successfully verified.</p>
      <p>You can now enjoy full access to our services.</p>
      <a class="button" href="${BASE_URL}/sign-in">Go To Sign In Page</a>
    </div>
  </body>
  </html>
  `
}

const BASE_URL = process.env.ENV === 'local' ? 'http://localhost' :'https://fakedropbox.fun'

module.exports = { getEmailVerifyContent, getVerificationSuccessContent, BASE_URL };
