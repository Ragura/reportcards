"use strict";

import { app, protocol, BrowserWindow, dialog } from "electron";
const { autoUpdater } = require("electron-updater");
const contextMenu = require("electron-context-menu");
import "./electron/print";

import {
  createProtocol,
  installVueDevtools
} from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";

// const logger = require("electron-log");

// autoUpdater.logger = logger;

// Create contextmenu
contextMenu({
  prepend: (defaultActions, params, browserWindow) => [
    {
      label: "Rainbow",
      // Only show it when right-clicking images
      visible: params.mediaType === "image"
    }
  ],
  labels: {
    copy: "Kopiëren",
    cut: "Knippen",
    paste: "Plakken"
  }
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(["app"], { secure: true });
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1110,
    height: 768,
    show: false,
    title: "SJCA Rapporten"
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  win.on("closed", () => {
    win = null;
  });

  win.on("ready-to-show", () => {
    win.show();
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools();
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }

  createWindow();

  if (!isDevelopment) {
    autoUpdater.checkForUpdates();
    autoUpdater.downloadUpdate();
  }
});

// autoUpdater.autoDownload = true;

autoUpdater.on("checking-for-update", () => {
  win.webContents.send("checking-for-update", "Zoeken naar updates...");
});

autoUpdater.on("update-available", info => {
  win.webContents.send("update-available", info);
});

autoUpdater.on("update-not-available", info => {
  win.webContents.send("update-not-available", info);
});

autoUpdater.on("error", err => {
  win.webContents.send("Fout bij updaten.", err);
});

//Auto Update
autoUpdater.on("update-downloaded", () => {
  win.webContents.send("update-downloaded", "Gedownload");

  dialog.showMessageBox(
    {
      type: "info",
      title: "Rapporten SJCA: nieuwe update beschikbaar",
      message:
        "Er is een nieuwe update beschikbaar. Wil je deze installeren? (het programma start automatisch terug op)",
      buttons: ["Ja", "Nee"]
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        const isSilent = true;
        const isForceRunAfter = true;
        autoUpdater.quitAndInstall(isSilent, isForceRunAfter);
      }
    }
  );
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
