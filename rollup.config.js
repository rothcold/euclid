import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const builds = [
  // browser-friendly UMD build
  {
    input: 'src/euclid.ts',
    output: {
      name: 'EUCLID',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),   // so Rollup can find `ms`
      commonjs(),  // so Rollup can convert `ms` to an ES module
      typescript({ tsconfig: "./tsconfig.json" }) // so Rollup can convert TypeScript to JavaScript
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify 
  // `file` and `format` for each target)
  {
    input: 'src/euclid.ts',
    external: ['three'],
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" }) // so Rollup can convert TypeScript to JavaScript
    ],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      }
    ]
  }
];

export default builds