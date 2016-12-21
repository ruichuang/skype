var client_id = "aeec8f17-f490-4d2b-9365-d0958a420dfa";

var app, convoControlApi;

$(function () {

	if (!/^#access_token=/.test(location.hash)) {
		location.assign('https://login.microsoftonline.com/common/oauth2/authorize?response_type=token' +
			'&client_id=' + client_id +
	    '&redirect_url=' + location.href +
	    '&resource=https://webdir.online.lync.com');
	}


	Skype.initialize({
      apiKey: 'a42fcebd-5b43-4b89-a065-74450fb91255'
    }, function (api) {
      app = api.UIApplicationInstance;
      convoControlApi = api;

      signIn();
    }, function (err){
      alert(err);
    });

    function signIn() {
      let dfd = app.signInManager.signIn({
        version: 'messager/1.0.0',
        client_id: client_id,
        origins: ['https://webdir.online.lync.com/autidisvocer/autodiscoverservice.svc/root'],
        cors: true,
        redirect_url: '/skype/random/token.html',
      }).then(function() {
        alert('signed in successfully as: ' + app.personsAndGoupsManager.mePerson.id());
        app.conversationsManager.conversations.added(onConversationAdded);
      });

      monitor(dfd, 'sign in');

  	}
})

