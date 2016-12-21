

function outgoing(modalities) {
	var uris = $(#'input').val().toLowerCase().split(',').map(function (s) {
		return s.trim();
	});

	var conversationDiv = document.createElement('div');
	document.getElementById('conversations').appendChild(conversationDiv);

	var dfd = conversationControlApi.renderConversation(conversationDiv, {
		modalities: modalities,
		participants: uris
	}).then(function (conversation) { });

	monitor(dfd, 'render conversation');
}