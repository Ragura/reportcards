import { BrowserWindow, ipcMain, shell } from "electron";

// const path = require("path");
const fs = require("fs");
// const os = require("os");

// Add printer events
ipcMain.on("print-to-pdf", (event, path) => {
  // const pdfPath = path.join(os.tmpdir(), "test-pdf.pdf");
  const win = BrowserWindow.fromWebContents(event.sender);

  win.webContents.printToPDF(
    {
      pageSize: "A4",
      marginsType: 1,
      printBackground: true
    },
    (error, data) => {
      if (error) {
        return console.log(error.message);
      }

      fs.writeFile(path, data, err => {
        if (err) {
          return console.log(err.message);
        }
        // shell.openExternal("file://" + path);
        event.sender.send("wrote-pdf", path);
      });
    }
  );
});
