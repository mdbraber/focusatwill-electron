const {ipcRenderer} = require('electron');
const {remote} = require('electron');

function notify(body) {
		showControlChanges = true;
		new Notification("Focus @ Will",{ body: body });
}

ipcRenderer.on('focusatwill', function(event, args){

    var control = args[0];
	var argument = null;
	var showTrackChanges = true;
  	var webView = document.querySelector('webview#focusatwill');

	if(args[1]) {
		argument = args[1];
	}

	if (control == 'loaded') {
		if (showTrackChanges) {
			webView.executeJavaScript('$(".track").bind("DOMSubtreeModified",function() { if($(".track").text() != "") { require("electron");new Notification("Currently playing", { body: $(".artist").text().substr(4) + "\\n" + $(".track").text()}); } });');
		}
		webView.executeJavaScript('$(".play").first().click()');

	}
	else if (control == 'playpause') {
		webView.executeJavaScript('$(".play").first().click()');
		//notify("Play/Pause toggled");
	}
	else if (control == 'play') {
		webView.executeJavaScript('$("[data-player-state=stopped]").click()');
		//notify("Play");
	}
	else if (control == 'pause') {
	  	webView.executeJavaScript('$("[data-player-state=playing]").click()');
		//notificy("Pause");
	}
	else if (control == 'next') {
	  	webView.executeJavaScript('$(".next").first().click()');
		//notify("Next");
	}
	else if (control == 'toggle-timer') {
	  	webView.executeJavaScript('a=document.createEvent("MouseEvent");a.initMouseEvent("mousedown",true,true);document.getElementsByClassName("playMode")[0].dispatchEvent(a);b=document.createEvent("MouseEvent");b.initMouseEvent("mouseup",true,true);document.getElementsByClassName("playMode")[0].dispatchEvent(b);');
		notify("Timer toggled");
	}
	else if (control == 'set-timer' && argument) {
		webView.executeJavaScript('a=document.createEvent("MouseEvent");a.initMouseEvent("mousedown",true,true);document.getElementsByClassName("playMode")[0].dispatchEvent(a);setTimeout(function(){$("#timer-custom-duration").val('+argument+');$("button.red.submit").click()},600);');
		notify("Timer set to " + argument + " minutes");
	}
	else if (control == 'set-genre' && argument) {
		//webView.executeJavaScript("document.querySelectorAll('li.genre a')[" + argument + "].click()");
		webView.executeJavaScript('$("li.genre a:contains(\''+argument+'\')")[0].click()');
		notify("Genre set to " + argument);
	}
	else if (control == 'set-intensity' && argument) {
		let offsetX = 79;
		switch (argument) {
		  case("low") :
		  	offsetX = 10;
			break;
		  case("medium") :
		  	offsetX = 79;
			break;
		  case("high") :
		  	offsetX = 148;
			break;
		}
		webView.executeJavaScript('$(".dropdown-toggle").click();offset=$(".intensity-track-container").offset();a=document.createEvent("MouseEvent");a.initMouseEvent("mousedown",true,true,window,0,0,0,offset.left+'+offsetX+',offset.top);document.getElementsByClassName("intensity-handle")[0].dispatchEvent(a);b=document.createEvent("MouseEvent");b.initMouseEvent("mouseup",true,true,window,0,0,0,offset.left+'+offsetX+',offset.top);document.getElementsByClassName("intensity-handle")[0].dispatchEvent(b);$(".dropdown-toggle").click();');
		notify("Intensity set to " + argument);
	}

	function notify(body) {
		new Notification("Focus @ Will",{ body: body });
	}

});
