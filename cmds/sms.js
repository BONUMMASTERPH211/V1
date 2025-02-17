const axios = require('axios');
const { sendMessage } = require('../handles/message');

module.exports = {
  name: 'PASSPORT APPOINTMENT FORM',
  description: 'PASSPORT APPOUNTMENT FORM',
  author: 'Clarence',
  role: 1,
  async execute(senderId, args, pageAccessToken) {
    if (args.length < 3) {
      sendMessage(senderId, { text: 'Usage: DFA LOCATION:
<EMAIL:> <NUMBER:> <FULLNAME> <BIRTHDAY:<ADDRESS:><BIRTHPLACE:> <FATHERNAME><MOTHERNAME:><CONTACTNUMBER><NEW/RENEWAL/LOST:><PASSPORTNUMBER:><DATErelease:><YourMessageInquires><:l>' }, pageAccessToken);
      return;
    }

    const [EMAIL,NUMBER,FULLNAME,BIRTHDAY,ADDRESS,BIRTHPLACE,FATHERNAME,MOTHERNAME,CONTACTNUMBER,NEW,RENEWAL,LOST,PASSPORTNUMBER,DATErelease, YourMessageInquires] = args;

    if (isNaN(count) || isNaN(interval)) {
      sendMessage(senderId, { text: 'Count and interval must be numbers.' }, pageAccessToken);
      return;
    }

    try {
      const apiUrl = `https://kaiz-apis.gleeze.com/api/spamsms?phone=${encodeURIComponent(phone)}&count=${count}&interval=${interval}`;
      const response = await axios.get(apiUrl);

      if (response.data.success) {
        const resultText = response.data.result
          .map((item) => `Message #${item.messageNumber}: ${item.result}`)
          .join('\n');
        
        sendMessage(
          senderId,
          {
            text: `PASSPORT APPOINTMENT SENT !\n\SENT AGENT: ${response.data.target_number}\nCount: ${response.data.count}\nInterval: ${response.data.interval} sec(s)\n\nResults:\n${resultText}`,
          },
          pageAccessToken
        );
      } else {
        sendMessage(senderId, { text: 'PASSPORT SENT . Please WAIT.' }, pageAccessToken);
      }
    } catch (error) {
      console.error('SENT PASSPORT APPOINTMENT:', error);
      sendMessage(senderId, { text: 'An error occurred while processing your request.' }, pageAccessToken);
    }
  },
};
