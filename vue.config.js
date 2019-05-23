module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.electron.sjcarapporten",
        productName: "SJCA Rapporten",
        copyright: "Copyright © 2019-* Steven Schoovaerts",
        publish: [
          {
            provider: "github",
            private: true
          }
        ],
        win: {
          publisherName: "Studieanker",
          target: "nsis"
          // icon: "./icon.ico"
        }
      }
    }
  }
};
