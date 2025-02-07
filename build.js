import {build, context} from "esbuild"
import progress from "@olton/esbuild-plugin-progress"
import { replace } from "esbuild-plugin-replace";
import pkg from "./package.json" with {type: "json"};

const version = pkg.version
const production = process.env.MODE === "production"

const banner = `
/*!
 * Datetime v${version}.
 * Build time: ${new Date().toLocaleString()}
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

if (production) {
    await build({
        ...defaults,
        entryPoints: ["src/index.js"],
        outfile: 'dist/datetime.js',
        format: "esm",
        plugins: [
            progress({
                text: 'Building Datetime ESM...',
                succeedText: 'ESM built successfully in %s ms!'
            }),
            replace({
                '__BUILD_TIME__': new Date().toLocaleString(),
                '__VERSION__': version,
            })
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
                succeedText: 'Lib built successfully in %s ms!'
            }),
            replace({
                '__BUILD_TIME__': new Date().toLocaleString(),
                '__VERSION__': version,
            })
        ],
    })
} else {
    const ctxEsm = await context({
        ...defaults,
        entryPoints: ["src/index.js"],
        outfile: 'dist/datetime.js',
        format: "esm",
        plugins: [
            progress({
                text: 'Building Datetime ESM...',
                succeedText: 'ESM built successfully in %s ms!'
            }),
            replace({
                '__BUILD_TIME__': new Date().toLocaleString(),
                '__VERSION__': version,
            })
        ],
    })

    const ctxLib = await context({
        ...defaults,
        entryPoints: ["src/index.js"],
        outfile: 'lib/datetime.js',
        format: "iife",
        minify: production,
        sourcemap: false,
        plugins: [
            progress({
                text: 'Building Datetime Lib...',
                succeedText: 'Lib built successfully in %s ms!'
            }),
            replace({
                '__BUILD_TIME__': new Date().toLocaleString(),
                '__VERSION__': version,
            })
        ],
    })
    
    await Promise.all([
        await ctxEsm.watch(),
        await ctxLib.watch(),
    ]).catch(() => process.exit(1))
}


