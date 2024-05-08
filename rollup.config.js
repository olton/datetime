import terser from '@rollup/plugin-terser'
import progress from 'rollup-plugin-progress';
import pkg from "./package.json" assert {type: "json"}
import fs from "node:fs"

const production = process.env.MODE === 'production'
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

let txt

txt = fs.readFileSync(`src/browser.js`, 'utf8')
txt = txt.replace(/version = ".+"/g, `version = "${pkg.version}"`)
txt = txt.replace(/build_time = ".+"/g, `build_time = "${new Date().toLocaleString()}"`)
fs.writeFileSync(`src/browser.js`, txt, { encoding: 'utf8', flag: 'w+' })

txt = fs.readFileSync(`src/index.js`, 'utf8')
txt = txt.replace(/version = ".+"/g, `version = "${pkg.version}"`)
txt = txt.replace(/build_time = ".+"/g, `build_time = "${new Date().toLocaleString()}"`)
fs.writeFileSync(`src/index.js`, txt, { encoding: 'utf8', flag: 'w+' })


export default [
    {
        input: './src/browser.js',
        watch: { clearScreen: false },
        output: {
            file: './lib/datetime.js',
            format: 'iife',
            sourcemap: false,
            banner,
            plugins: [
                production && terser({
                    keep_classnames: true,
                    keep_fnames: true,
                })
            ],
        }
    },
    {
        input: './src/index.js',
        watch: { clearScreen: false },
        output: {
            file: './dist/datetime.es.js',
            format: 'es',
            banner,
        }
    },
    {
        input: './src/index.js',
        watch: { clearScreen: false },
        output: {
            file: './dist/datetime.cjs.js',
            format: 'cjs',
            banner,
        }
    },
];
