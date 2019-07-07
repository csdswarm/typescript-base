import ts from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  output: [{
    // Change this to the name you want to output your app as (e.g. myApp for window.myApp, or global.myApp)
    name: 'globalAppVar',
    file: 'build/dist/bundle.js',
    format: 'umd',
  }],
  plugins: [ts()]
}