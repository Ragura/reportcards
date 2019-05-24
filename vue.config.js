module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.electron.sjcarapporten",
        productName: "Rapporten SJCA",
        copyright: "Copyright © 2019-* Steven Schoovaerts",
        publish: [
          {
            provider: "github",
            owner: "Ragura",
            repo: "reportcards",
            verifyUpdateCodeSignature: false
          }
        ],
        win: {
          publisherName: "Studieanker",
          target: "nsis",
          verifyUpdateCodeSignature: false,
          icon: "./icon.ico"
        },
        nsis: {
          oneClick: false,
          perMachine: true,
          allowElevation: true,
          allowToChangeInstallationDirectory: true
        }
      }
    }
  }
};
