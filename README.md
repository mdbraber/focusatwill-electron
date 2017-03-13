# Focus @ Will-electron

Standalone Focus @ Will app in Electron

## Installation from source

If you are on Windows/Linux you need to install from source. 

Prerequisits:

- git
- node/npm

### Start the app with electron

```
npm install -g electron
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
