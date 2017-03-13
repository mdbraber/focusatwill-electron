# focusatwill-electron

Standalone Focus @ Will app (in Electron) featuring keyboard shortcuts, notifications and menu items for most functions.

## Installation

Download and install from [latest binary](https://github.com/mdbraber/focusatwill-electron/releases/tag/1.0)

## Installation from source

If you are on Windows/Linux you need to install from source. 

Prerequisits:

- git
- node/npm

### Start the app with electron

```
npm install electron --save-dev
npm install
npm start
```

### Package it into a native OS X app:

```
npm install electron-packager -g
electron-packager ./ "Focus @ Will" --overwrite --platform=darwin --arch=x64 --icon focusatwill.icns
mv "Focus @ Will-darwin-x64/Focus @ Will.app" /Applications/
```

### Package it for redistribution (mostly note to self)

```
npm i electron-installer-dmg -g
electron-installer-dmg "Focus @ Will-darwin-x64/Focus @ Will.app" "Focus @ Will"
```

## Credits

Thanks to [Philipp Keller](https://github.com/philippkeller/goodbudget-electron) for pointers in his Github repository.
