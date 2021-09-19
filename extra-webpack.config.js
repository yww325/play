const singleSpaAngularWebpack =
  require("single-spa-angular/lib/webpack").default;
const SystemJSPublicPathWebpackPlugin = require("systemjs-webpack-interop/SystemJSPublicPathWebpackPlugin");

const StandaloneSingleSpaPlugin = require("standalone-single-spa-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devServer: {
    // Not required, but it's often useful to run webpack-dev-server in SPA mode
    historyApiFallback: true,
  },
  plugins: [
    // the standalone plugin works in conjunction with HtmlWebpackPlugin
    new HtmlWebpackPlugin(),

    new StandaloneSingleSpaPlugin({
      // required
      appOrParcelName: "play standalone",

      // optional - strongly encouraged for single-spa applications
      //dactiveWhen: ["/play"],

      // optional - useful for enabling cross-microfrontend imports
      importMapUrl: new URL("https://localhost:9001/importmap.json"),

      // optional - useful for adding an additional, local-only import map
      importMap: {
        imports: {
          "other-module": "/other-module.js",
        },
      },

      // optional - defaults to false. This determines whether to mount
      // your microfrontend as an application or a parcel
      isParcel: false,

      // optional - you can disable the plugin by passing in this boolean
      disabled: false,

      // optional - the standalone plugin relies on optionalDependencies in the
      // package.json. If this doesn't work for you, pass in your HtmlWebpackPlugin
      // to ensure the correct one is being referenced
      HtmlWebpackPlugin,

      // optional - defaults to true - turns on or off import-map-overrides.
      importMapOverrides: true,

      // optional - defaults to null. This allows you to hide the import-map-overrides UI
      // unless a local storage key is set. See more info at https://github.com/joeldenning/import-map-overrides/blob/master/docs/ui.md#enabling-the-ui
      importMapOverridesLocalStorageKey: null,

      // optional - defaults to {}. The single-spa custom props passed to the application
      // Note that these props are stringified into the HTML file
      customProps: {
        authToken: "sadf7889fds8u70df9s8fsd",
      },

      // optional - defaults to turning urlRerouteOnly on
      // The options object passed into single-spa's start() function.
      // See https://single-spa.js.org/docs/api#start
      startOptions: {
        urlRerouteOnly: true,
      },
    }),
  ],
};

// module.exports = (config, options) => {
//   const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

//   singleSpaWebpackConfig.plugins.push(
//     new SystemJSPublicPathWebpackPlugin({
//       // ONLY NEEDED FOR WEBPACK 1-4. Not necessary for webpack@5
//       systemjsModuleName: "@angular-microfrontends/play",
//     })
//   );

//   singleSpaWebpackConfig.externals.push(
//     "@angular/common",
//     "@angular/core",
//     "@angular/platform-browser",
//     "@angular/router",
//     "@angular-microfrontends/game-core",
//     "rxjs",
//     "rxjs/operators",
//     "single-spa"
//   );

//   // Feel free to modify this webpack config however you'd like to
//   return singleSpaWebpackConfig;
// };
