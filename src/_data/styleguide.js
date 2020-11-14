const tokens = require('./tokens.json');

module.exports = {
  themecolors() {
    let response = [];

    Object.keys(tokens.colors.themeColors).forEach(key => {
      response.push({
        value: tokens.colors.themeColors[key],
        key
      });
    });

    return response;
  },
  bodycolors() {
    let response = [];

    Object.keys(tokens.colors.bodyColors).forEach(key => {
      response.push({
        value: tokens.colors.bodyColors[key],
        key
      });
    });

    return response;
  },
  sidebarcolors() {
    let response = [];

    Object.keys(tokens.colors.sidebarColors).forEach(key => {
      response.push({
        value: tokens.colors.sidebarColors[key],
        key
      });
    });

    return response;
  },
  headercolors() {
    let response = [];

    Object.keys(tokens.colors.headerColors).forEach(key => {
      response.push({
        value: tokens.colors.headerColors[key],
        key
      });
    });

    return response;
  },
  spacing() {
    let response = [];

    Object.keys(tokens['spacing']).forEach(key => {
      response.push({
        value: tokens['spacing'][key],
        key
      });
    });

    return response;
  }
};
