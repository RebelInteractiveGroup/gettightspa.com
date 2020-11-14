const builtins = require('@erquhart/rollup-plugin-node-builtins');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const json = require('rollup-plugin-json');
import {terser} from 'rollup-plugin-terser';

export default [{
    input: 'src/_views/admin/util',
    output: {
      file: 'dist/admin/util.js',
      format: 'iife',
      name: 'previewUtil',
    },
    plugins: [
      builtins(),
      nodeResolve(),
      commonjs(),
      json(),
    ]
  },
  {
    treeshake: true,
    input: 'src/_assets/js/app.js',
    output: [
      {
        file: 'src/_assets/output/js/app.js',
        format: 'umd',
        name: 'previewUtil',
      },
      {
        file: 'src/_assets/output/js/app.min.js',
        format: 'iife',
        name: 'version',
        plugins: [terser()]
      }
    ],
    plugins: [
      builtins(),
      nodeResolve(),
      commonjs(),
      json(),
    ]
}];
