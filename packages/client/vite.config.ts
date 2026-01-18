import type { UserConfig } from 'vite'

export default {
    build: {
        rollupOptions: {
            input: "index.html",
        }
    },
    worker: {
        format: 'es',
        rollupOptions: {
            output: {
                entryFileNames: 'worker.js'
            }
        }
    }
} satisfies UserConfig