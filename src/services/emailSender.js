const awsSecretsRetriever = require('./awsSecretsRetriever');

async function send(content) {
    try {
        const SibApiV3Sdk = require('sib-api-v3-sdk');
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = await awsSecretsRetriever.retrieve('SendinBlueKey');

        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        sendSmtpEmail.to = [{ "email":"didi566@gmail.com", "name":"Yedidya Schwartz"}];
        sendSmtpEmail.sender = { "email":"yad2Searcher@domain.com", "name":"yad2Searcher"};
        sendSmtpEmail.htmlContent = content;
        sendSmtpEmail.subject = "YAD2SEARCHER ALERT - new ids";
        sendSmtpEmail.headers = {"x-mailin-custom":"myV3Custom" };
        sendSmtpEmail.tags = ["yad2Searcher","newApartments"];
        // sendSmtpEmail.attachment =  [{"url": "https://example.com/ValidimageUrl1.jpg"},{"url": "https://example.com/ValidimageUrl2.jpg"}]
        
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log(`Email was sent successfully. Returned data: ${data}`);
    } catch (ex) {
        console.log(`Error sending mail: ${ex}`);
    }
}

module.exports = {
    send: send
}