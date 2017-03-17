const {Menu, MenuItem, app} = remote;

const execute = function(args) {
	w = remote.getCurrentWindow();
	w.webContents.send("focusatwill", args);
};

var genres = [
	"Classical",
	"Neuro Space",
	"Focus Spa",
	"Uptempo",
	"Alpha Chill",
	"Classical Piano",
	"Acoustical",
	"Cinematic",
	"Ambient",
	"Water",
	"Baroque Piano",
	"ADHD Type 1",
	"Oct Beta Test",
	"Cafe Focus Beta",
	"Cafe Creative Beta",
	"Drums && Hums Beta",
	"Drums && Hums Turbo Beta",
	"Drum Zone Beta",
	"Drum Zone Turbo Beta",
	"Hand Drums && Hums Beta",
	"Hand Drums && Hums Turbo Beta",
	"Kora Beta",
	"Kora Beta w/Entrainment"
];

var genreMenuString = '[{ label: "Genre",\nsubmenu: [\n';
for (g in genres) {
		genreMenuString += '{ label: "'+genres[g]+'", click: function() { execute(["set-genre","'+genres[g].replace("&&","&")+'"]); }},\n';
}
genreMenuString += ']}];';

var menuArray = [{
    label: "Application",
    submenu: [
        { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
		{ label: "Reload", click(item, win) { win.reload(); }},
		{ label: "Toggle && DevTools", 
          accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
          click(item, win) { win.toggleDevTools(); }},
        { type: "separator" },
        { label: "Close", accelerator: "Command+W", click: function() { app.hide(); }},
		{ label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
    ]}, {
    label: "Edit",
    submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]}, {
    label: "Controls",
    submenu: [
      { label: "Toggle Timer", accelerator: "Shift+CmdOrCtrl+T", click: function() { execute(["toggle-timer"]); }},
      { label: "Play/Pause", accelerator: "Shift+CmdOrCtrl+P", click: function() { execute(["playpause"]); }},
      { label: "Play", click: function() { execute(["play"]); }},
      { label: "Pause", click: function() { execute(["pause"]); }, enabled: false },
      { label: "Next", accelerator: "Shift+CmdOrCtrl+N", click: function() { execute(["next"]); }}
 	]}, {
	label: "Timer",
	submenu: [
	  { label: "25 minutes", click: function() { execute(["set-timer",25]); }},
	  { label: "50 minutes", click: function() { execute(["set-timer",50]); }},
	  { label: "75 minutes", click: function() { execute(["set-timer",75]); }},
	  { label: "100 minutes", click: function() { execute(["set-timer",100]); }}
	]}, {
    label: "Intensity",
	submenu: [
	  { label: "Low", click: function() { execute(["set-intensity","Low"]); }},
	  { label: "Medium", click: function() { execute(["set-intensity","Medium"]); }},
	  { label: "High", click: function() { execute(["set-intensity","High"]); }}
	]}
];

var genreMenuArray = eval(genreMenuString);
var menu = menuArray.concat(genreMenuArray);
Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
