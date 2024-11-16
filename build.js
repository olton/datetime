import {build} from "esbuild"
import progress from "@olton/esbuild-plugin-progress"
import pkg from "./package.json" with {type: "json"};

const production = process.env.MODE === "production"

const banner = `
/*!
 * Datetime v${pkg.version}. 
 * Copyright ${new Date().getFullYear()} by Serhii Pimenov
 * Licensed under MIT
 *
 * Build time: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
 */
`

const defaults = {
    bundle: true,
    minify: false,
    sourcemap: false,
    banner: {
        js: banner,
    },
}

await build({
    ...defaults,
    entryPoints: ["src/index.js"],
    outfile: 'dist/datetime.js',
    format: "esm",
    plugins: [
        progress({
            text: 'Building Datetime ESM...',
            succeedText: 'Datetime ESM built successfully in %s ms!'
        }),
    ],
})

await build({
    ...defaults,
    entryPoints: ["src/index.js"],
    outfile: 'dist/datetime.cjs',
    format: "cjs",
    plugins: [
        progress({
            text: 'Building Datetime CJS...',
            succeedText: 'Datetime CJS built successfully in %s ms!'
        }),
    ],
})

await build({
    ...defaults,
    entryPoints: ["src/index.js"],
    outfile: 'lib/datetime.js',
    format: "iife",
    minify: production,
    sourcemap: false,
    plugins: [
        progress({
            text: 'Building Datetime Lib...',
            succeedText: 'Datetime Lib built successfully in %s ms!'
        }),
    ],
})

