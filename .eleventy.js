const rssPlugin = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const fs = require('fs');

// Import filters
const dateFilter = require('./src/filters/date-filter.js');
const markdownFilter = require('./src/filters/markdown-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

// Import transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');
const parseTransform = require('./src/transforms/parse-transform.js');

// Import data files
const site = require('./src/_data/site.json');

// Lazy load and LQIP
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');

// PWA
const pluginPWA = require("eleventy-plugin-pwa");

module.exports = function(config) {
  // Filters
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('markdownFilter', markdownFilter);
  config.addFilter('w3DateFilter', w3DateFilter);

  // Layout aliases
  config.addLayoutAlias('home', 'layouts/home.njk');
  config.addLayoutAlias('page', 'layouts/page.njk');
  config.addLayoutAlias('archive', 'layouts/archive.njk');

  // Transforms
  config.addTransform('htmlmin', htmlMinTransform);
  config.addTransform('parse', parseTransform);

  // Passthrough copy
  config.addPassthroughCopy({ 'src/_assets/output': '_assets' });
  config.addPassthroughCopy({ 'src/_assets/images': '_assets/images' });
  config.addPassthroughCopy({ 'src/_assets/icons': '_assets/icons' });
  config.addPassthroughCopy('src/static');
  config.addPassthroughCopy({ 'src/_views/admin/config.yml': 'admin/config.yml' });
  config.addPassthroughCopy({ 'src/_views/admin/previews.js': 'admin/previews.js' });
  config.addPassthroughCopy('node_modules/nunjucks/browser/nunjucks-slim.js');
  config.addPassthroughCopy('src/robots.txt');
  config.addPlugin(lazyImagesPlugin, {
    imgSelector: '.content img',
  });

  const now = new Date();

  // Custom collections
  const livePosts = post => post.date <= now && !post.data.draft;

  config.addCollection('posts', collection => {
    return [
      ...collection.getFilteredByGlob('./src/collections/posts/*.md').filter(livePosts)
    ].reverse();
  });

  config.addCollection('postFeed', collection => {
    return [...collection.getFilteredByGlob('./src/collections/posts/*.md').filter(livePosts)]
      .reverse()
      .slice(0, site.maxPostsPerPage);
  });

  // Plugins
  config.addPlugin(rssPlugin);
  config.addPlugin(syntaxHighlight);

  // PWA
  if(process.env.ELEVENTY_ENV != "development") {
    config.addPlugin(pluginPWA, {
      swDest: "dist/service-worker.js",
      globDirectory: "./dist",
      clientsClaim: true,
      skipWaiting: true,
      globIgnores: [
        'index.html',
        'admin\/**',
        'thank-you\/**',
      ]
    });
  }

  // 404
  config.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('dist/404.html');

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: "_views/_includes"
    },
    passthroughFileCopy: true
  };
};
