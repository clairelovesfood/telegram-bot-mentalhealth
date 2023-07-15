const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_TOKEN' with your actual bot token obtained from BotFather
const bot2 = new TelegramBot('6399085239:AAHvvp8RxfgKGTtuhdwgUDu1Ryc9fcCKlGw', { polling: true });

// Start command handler
bot2.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  askFeelingQuestion(chatId);
});

// Handle user input
bot2.onText(/(.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const choice = match[1];

  if (choice === 'Wanna process your emotion?') {
    bot2.sendMessage(chatId, 'Sure! Process your emotions by typing it out and use the /stop command when you\'re done.');
    bot2.once('message', (msg) => {
      bot2.sendMessage(chatId, 'Thank you for sharing your emotions. How are you feeling today?', {
        reply_markup: {
          keyboard: [
            [{ text: 'Wanna process your emotion?' }],
            [{ text: 'I want to talk to someone' }],
            [{ text: 'nah no time for that' }]
          ],
          one_time_keyboard: true
        }
      });
    });
  } else if (choice === 'I want to talk to someone') {
    bot2.sendMessage(chatId, 'Sure! Give me a minute.');
    bot2.sendMessage(chatId, 'What happened today? How are you feeling?', {
      reply_markup: {
        keyboard: [
          [{ text: 'Frustrated' }],
          [{ text: 'Sad' }],
          [{ text: 'Others' }]
        ],
        one_time_keyboard: true
      }
    });
  } else if (choice === 'Frustrated') {
    bot2.sendMessage(chatId, 'How are you dealing with this frustration?', {
      reply_markup: {
        keyboard: [
          [{ text: 'Shouting' }],
          [{ text: 'Crying' }],
          [{ text: 'Journalling' }]
        ],
        one_time_keyboard: true
      }
    });
  } else if (choice === 'Sad') {
    bot2.sendMessage(chatId, 'How are you dealing with this sadness?', {
      reply_markup: {
        keyboard: [
          [{ text: 'Cry it out' }],
          [{ text: 'Talking to someone' }],
          [{ text: 'Journalling' }]
        ],
        one_time_keyboard: true
      }
    });
  } else if (choice === 'Others') {
    bot2.sendMessage(chatId, 'How are you dealing with this?', {
      reply_markup: {
        keyboard: [
          [{ text: 'Isolating' }],
          [{ text: 'Talking to someone' }],
          [{ text: 'Journalling' }]
        ],
        one_time_keyboard: true
      }
    });
  } else if (['Shouting', 'Crying', 'Journalling'].includes(choice)) {
    bot2.sendMessage(chatId, 'I understand you\'re feeling this way and this is normal, but remember, don\'t keep it to yourself.');
    bot2.sendMessage(chatId, 'Okay great! See you next time!');
    askFeelingQuestion(chatId);
  } else if (['Cry it out', 'Talking to someone', 'Journalling'].includes(choice)) {
    bot2.sendMessage(chatId, 'I understand you\'re feeling sad and this is normal. It\'s okay to feel sad for a while, and let\'s take things slowly, shall we? :)');
    bot2.sendMessage(chatId, 'Okay great! See you next time!');
    askFeelingQuestion(chatId);
  } else if (['Isolating', 'Talking to someone', 'Journalling'].includes(choice)) {
    bot2.sendMessage(chatId, 'Hey, it\'s not easy to feel this way, but remember MentalHealthCheck is always here :)');
    bot2.sendMessage(chatId, 'Okay great! See you next time!');
    askFeelingQuestion(chatId);
  } else if (choice === 'nah no time for that') {
    bot2.sendMessage(chatId, 'You have chosen "' + choice + '".');
    showOptions(chatId);
  }
});

// Function to ask the feeling question
function askFeelingQuestion(chatId) {
  bot2.sendMessage(chatId, 'How are you feeling today?', {
    reply_markup: {
      keyboard: [
        [{ text: 'Wanna process your emotion?' }],
        [{ text: 'I want to talk to someone' }],
        [{ text: 'nah no time for that' }]
      ],
      one_time_keyboard: true
    }
  });
}

// Function to show the options after choosing "nah no time for that"
function showOptions(chatId) {
  bot2.sendMessage(chatId, 'You have chosen "nah no time for that".');
  bot2.sendMessage(chatId, 'Here are your options:');
  bot2.sendMessage(chatId, '1. Dance to TikTok');
  bot2.sendMessage(chatId, '2. Have a shopping spree');
  bot2.sendMessage(chatId, '3. Gym/nature walk');
  bot2.once('message', (msg) => {
    const chosenOption = msg.text;
    bot2.sendMessage(chatId, 'You have chosen "' + chosenOption + '".');
    askFeelingQuestion(chatId);
  });
}

// Start the bot
console.log('Bot2 has started.');
