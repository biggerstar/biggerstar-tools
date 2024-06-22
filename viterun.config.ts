import {resolve} from 'node:path';
import {defineViteRunConfig, viteRunLogPlugin, ViteRunHandleFunctionOptions} from "vite-run";
import dtsPlugin from "vite-plugin-dts";

export default defineViteRunConfig({
  baseConfig: getBaseConfig,
  packages: [
    './'
  ],
  targets: {
    '@biggerstar-tools': {
      build: [
        ['es', 'build_lib'],
      ],
      dev: [
        ['es', 'watch', 'build_lib']
      ]
    },
  },
  build: {
    es: {
      lib: {
        formats: ['es']
      },
    },
    watch: {
      watch: {},
    },
    minify: {
      minify: true
    },
    build_lib: (options: ViteRunHandleFunctionOptions) => {
      return {
        lib: {
          entry: resolve(options.packagePath, 'src/index.ts'),
          formats: ['es'],
          name: options.name,
          fileName: (_: string) => `index.js`,
        }, 
        rollupOptions: {
          watch: {},
          external: [
            '@biggerstar/mitt-bus',
            'is-what/dist',
          ],
          output: {}
        },
      }
    },
  },
})

function getBaseConfig(options: ViteRunHandleFunctionOptions) {
  return {
    resolve: {
      extensions: [".ts", ".js", '.css'],
      alias: {
        "@": resolve(options.packagePath, 'src'),
        types: resolve(options.packagePath, 'src/types')
      }
    },
    build: {
      emptyOutDir: false,
      minify: false,
      rollupOptions: {
        output: {
          sourcemap: false,
          globals: {}
        },
        treeshake: true
      },
    },
    plugins: [
      dtsPlugin({
        // rollupTypes: true,
        copyDtsFiles: true,
        clearPureImport: true
      }),
      viteRunLogPlugin({
        // server: {
        //     viteLog: true,
        //     viteRunLog: {
        //        sizeAntOutputPrint:false
        //     }
        // }
      }),
    ]
  }
}
