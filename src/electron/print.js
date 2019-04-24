import { BrowserWindow, ipcMain, shell } from "electron";

const path = require("path");
const fs = require("fs");
const os = require("os");

// Add printer events
ipcMain.on("print-to-pdf", event => {
  const pdfPath = path.join(os.tmpdir(), "test-pdf.pdf");
  const win = BrowserWindow.fromWebContents(event.sender);

  win.webContents.printToPDF(
    {
      pageSize: "A4",
      marginsType: 1
    },
    (error, data) => {
      if (error) {
        return console.log(error.message);
      }

      fs.writeFile(pdfPath, data, err => {
        if (err) {
          return console.log(err.message);
        }
        shell.openExternal("file://" + pdfPath);
        event.sender.send("wrote-pdf", pdfPath);
      });
    }
  );
});
