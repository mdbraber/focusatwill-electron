const electron = require('electron');
// Module to control application life.
const {app, globalShortcut} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let data;

let willQuitApp = false;

function createWindow() {
  // Create the browser window.
  //win = new BrowserWindow((data && data.bounds) ? data.bounds : {width: 900, height: 550, closable: false, skipTaskbar: true, minimizable: true});
  win = new BrowserWindow({width: 900, height: 550, closable: true, skipTaskbar: false, minimizable: true});

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
	app.quit();
  });

  win.on('close', (e) => {
	  if(willQuitApp) {
		  window = null;
	  } else {
		  e.preventDefault();
		  win.hide();
	  }
  });

  win.on('beforeunload', () => {
	  return false;
  });

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html`);

}

// Quit when all windows are closed.
//app.on('window-all-closed', () => {
//  // On macOS it is common for applications and their menu bar
//  // to stay active until the user quits explicitly with Cmd + Q
//  if (process.platform !== 'darwin') {
//    app.quit();
//  }
//});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
  win.show();
});

app.on('before-quit', () => willQuitApp = true);

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

app.on('ready', () => {
  var path = require("path");
  var fs = require("fs");
  var initPath = path.join(app.getPath('appData'), "init.json");
  try {
    data = JSON.parse(fs.readFileSync(initPath, 'utf8'));
  }
  catch(e) {
    console.log('error');
  }
  createWindow();

  //win.on("close", function() {
  //  var data = {
  //    bounds: win.getBounds()
  //  };
  //  fs.writeFileSync(initPath, JSON.stringify(data));
  //});

  globalShortcut.register('Shift+Ctrl+Alt+Super+6', function(){
    win.webContents.send('focusatwill', ['play']);
  });

  globalShortcut.register('Shift+Ctrl+Alt+Super+7', function(){
    win.webContents.send('focusatwill', ['pause']);
  });

  globalShortcut.register('Shift+Ctrl+Alt+Super+8', function(){
    win.webContents.send('focusatwill', ['playpause']);
  });

  globalShortcut.register('Shift+Ctrl+Alt+Super+9', function(){
    win.webContents.send('focusatwill', ['next']);
  });

  globalShortcut.register('Shift+Ctrl+Alt+Super+0', function(){
    win.webContents.send('focusatwill', ['toggle-timer']);
  });

  win.webContents.on('did-finish-load', function() {
    win.webContents.send("focusatwill", ['loaded']);
  });

});
