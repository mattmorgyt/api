global.request = require("request");
global.loggedIN = null;
global.APIUrl = 'https://mattmorg.us'

global.POST = function (url, data) {
	try {
	request.post(url, data);
	} catch (err) {
		console.log("problem: "+err);
	}
}
global.API = {
	_username: "",
	_password: "",
	_keepAlive: function () {
		request.post(APIUrl+'/login/api', {
		   form: {
			user: {
    				name: API._username,
    				pass: API._password,
			},
  		   },
		}, function(err, httpResponse, body) {
  			if (err) {
    				console.error('Error:', err);
   			 	return;
  			}
  			console.log(JSON.parse(body));
			loggedIN = body;
			//request.session.id = body.id;
		})

	},
	Client: function (username, password) {
		API._username = username;
		API._password = password;
		request.post(APIUrl+'/login/api', {
		   form: {
			user: {
    				name: username,
    				pass: password,
			},
  		   },
		}, function(err, httpResponse, body) {
  			if (err) {
    				console.error('Error:', err);
   			 	return;
  			}
  			console.log(JSON.parse(body));
			loggedIN = body;
			//request.session.id = body.id;
		})
		
		var C = {
			api: {
				newTweet: function (message1) {
					POST(APIUrl+'/post/api', {
					 form: {
					 	user: {
							name:API._username,
							pass:API._password,
						},
						tweet: {	
							text: message1
					 	},

					 },
					
					});
				}
			}
		}
		return C.api;

}
}