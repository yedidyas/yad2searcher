async function send(content) {
    try {
        const SibApiV3Sdk = require('sib-api-v3-sdk');
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = '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';

        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        sendSmtpEmail.to = [{ "email":"didi566@gmail.com", "name":"Yedidya Schwartz"}];
        sendSmtpEmail.sender = { "email":"yad2Searcher@yedidya.com", "name":"yad2Searcher"};
        sendSmtpEmail.htmlContent = content;
        sendSmtpEmail.subject = "YAD2SEARCHER ALERT - new ids";
        sendSmtpEmail.headers = {"x-mailin-custom":"myV3Custom" };
        sendSmtpEmail.tags = ["yad2Searcher","newApartments"];
        // sendSmtpEmail.attachment =  [{"url": "https://example.com/ValidimageUrl1.jpg"},{"url": "https://example.com/ValidimageUrl2.jpg"}]
        
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log(`Email send successfully. Returned data: ${data}`);
    } catch (ex) {
        console.log(`Error sending mail: ${ex}`);
    }
}

module.exports = {
    send: send
}