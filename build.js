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

const options = {
    entryPoints: ["src/index.js"],
    outfile: 'dist/datetime.js',
    format: "esm",
    bundle: true,
    minify: false,
    sourcemap: false,
    banner: {
        js: banner,
    },
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
}

if (production) {
    await build({
        ...options,
    })
} else {
    const ctxEsm = await context({
        ...options,
    })
    await Promise.all([
        await ctxEsm.watch(),
    ]).catch(() => process.exit(1))
}


