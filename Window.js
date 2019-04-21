'use strict'

const { BrowserWindow } = require('electron')

// default window settings
const defaultProps = {
  width: 800,
  height: 800,
  show: true,
  frame: true 
}

class Window extends BrowserWindow {
  constructor ({ file, ...windowSettings }) {
    // calls new BrowserWindow with these props
    super({ ...defaultProps, ...windowSettings })

    // load the html and open devtools
    this.loadFile(file)
    // this.webContents.openDevTools()

    // Hide menubar
    //this.setMenu(null);
    // gracefully show when ready to prevent flickering
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

module.exports = Window