const restify = require('restify');
const builder = require('botbuilder');


/**Create chat bot*/
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD 
});
const bot = new builder.UniversalBot(connector);

//=========================================================
// Bots Middleware
//=========================================================
bot.use(builder.Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i }));
bot.use(builder.Middleware.sendTyping());
// bot.use({
//     botbuilder: (session, next) => {
//         saveAddress = session.message.address
//         if(session.message.text == 'Get_Started' || session.message.text == 'RESTART'){
//             session.userData = {};
//             session.conversationData = {};
//         }

//         if(!session.userData.firstRun){
//             session.userData.firstRun = true;
//             session.beginDialog('/GetStarted');
//         }else{next();}
//     }
// });


bot.dialog('/', [
    (session) => {
        session.send('this is a test');
    }
]);


//=========================================================
// Server Setup
//=========================================================

const server = restify.createServer();

/**Endpoint for incoming messages*/
server.post('/api/messages', connector.listen());

/**Start listening on 3978 by default*/ 
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('Restify listening to port: %s', server.url);
});
