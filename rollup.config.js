import { terser } from 'rollup-plugin-terser'
// import { babel } from '@rollup/plugin-babel'
// import commonjs from '@rollup/plugin-commonjs'
import glob from 'glob'

function getI18N() {
    return glob.sync('src/*/*.js', {
        ignore: [
            'src/core/*.js',
            'src/plugins/*.js',
            'src/helpers/*.js',
            'src/*.js',
        ],
    });
}

export default [
    {
        input: 'src/browser.js',
        output: [
            {
                file: 'lib/datetime.js',
                format: 'iife',
                name: "",
                plugins: [
                ]
            },
            {
                file: 'lib/datetime.min.js',
                format: 'iife',
                name: "",
                plugins: [
                    terser()
                ]
            }
        ]
    }
]
