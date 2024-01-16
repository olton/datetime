import terser from '@rollup/plugin-terser'
import progress from 'rollup-plugin-progress';
import pkg from "./package.json" assert {type: "json"}

const production = !(process.env.ROLLUP_WATCH)
const sourcemap = !production

const banner = `
/**
* Datetime v${pkg.version}. 
* Copyright ${new Date().getFullYear()} by Serhii Pimenov
* Licensed under MIT
*
* Build time: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
*/
`

export default [
    {
        input: 'src/browser.js',
        watch: {
            include: 'src/**',
            clearScreen: false
        },
        plugins: [
            progress({
                clearLine: true,
            }),
        ],
        output: [
            {
                file: 'lib/datetime.js',
                format: 'iife',
                name: "dt",
                sourcemap: false,
                banner,
            },
            {
                file: 'lib/datetime.min.js',
                format: 'iife',
                name: "dt",
                sourcemap,
                banner,
                plugins: [
                    terser({
                        keep_classnames: true,
                        keep_fnames: true,
                    })
                ]
            }
        ]
    }
]
