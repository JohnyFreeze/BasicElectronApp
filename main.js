'use strict'

process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
//const crashReporter = electron.crashReporter
const Menu = electron.Menu

let menu
let template
let mainWindow = null
let videoWindow = null

//crashReporter.start()

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')()
}

app.on('window-all-closed', () => {
  app.quit()
})

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#D9DBDE'
  })
  mainWindow.loadURL(`file://${__dirname}/src/app.html`)
  mainWindow.maximize()
  mainWindow.on('closed', (e) => {
    if (videoWindow != null) {
      videoWindow.close()
    }
    mainWindow = null
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools()
  }

  template = [{
    label: 'View',
    submenu: (process.env.NODE_ENV === 'development') ? [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',

        click () {
          mainWindow.restart()
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+CmdOrCtrl+I',

        click () {
          mainWindow.toggleDevTools()
        }
      }] : []
  }, {
    label: 'Edit',
    submenu: [
      {label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:'},
      {label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:'},
      {type: 'separator'},
      {label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:'},
      {label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:'},
      {label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:'},
      {label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:'}
    ]
  }]

  menu = Menu.buildFromTemplate(template)

  if (process.platform === 'darwin') {
    Menu.setApplicationMenu(menu)
  } else {
    mainWindow.setMenu(menu)
  }
})
