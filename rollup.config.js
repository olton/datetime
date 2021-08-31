import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/datetime.cjs.js',
            format: 'cjs',
        },
        {
            file: 'dist/es/datetime.esm.js',
            format: 'es'
        },
        {
            file: 'lib/datetime.js',
            format: 'iife',
            name: "Datetime",
            plugins: [
                terser()
            ]
        }
    ],
    plugins: [
        json(),
        commonjs(),
        babel({ babelHelpers: 'bundled' })
    ]
}