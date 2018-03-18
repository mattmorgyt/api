require("./index");
var Twit = require('twit');
global.config =
	{
  		bot_username: "",
		bot_password: "",
		consumer_key: '',
  		consumer_secret:      '',
  		access_token:         '',
  		access_token_secret:  '',
  		timeout_ms:           60*1000,  // optional HTTP request 			timeout to apply to all requests. 
	};
global.bot = API.Client(config.bot_username, config.bot_password);
//bot.newTweet("Bot now online.");
//bot.newTweet("Bot online.");
var T = new Twit(config);
var stream = T.stream('statuses/filter', { track: ["@pesadeli", "pesadeli"] });
stream.on('tweet', function (tweet) {
	if(tweet.user.name == "pesadeli") {
		console.log(tweet.text)
		bot.newTweet("@"+tweet.user.name+" "+tweet.text);
	}
})