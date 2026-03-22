/**
 * 创建 Airx 的 Vite 插件。
 *
 * 插件默认启用 automatic JSX 运行时（jsxImportSource: airx），
 * 同时支持 classic 模式向后兼容。
 *
 * @returns Vite 插件对象。
 *
 * @example
 * import { defineConfig } from 'vite'
 * import airx from 'vite-plugin-airx'
 *
 * export default defineConfig({
 *   plugins: [airx()]
 * })
 */
export function VitePluginAirx(options = {}) {
    const runtime = options.runtime ?? 'automatic';
    const importSource = options.importSource ?? 'airx';
    return {
        name: 'airx',
        enforce: 'pre',
        config(config) {
            const currentEsbuild = typeof config.esbuild === 'object' && config.esbuild != null
                ? config.esbuild
                : {};
            const nextEsbuild = runtime === 'automatic'
                ? {
                    ...currentEsbuild,
                    jsx: 'automatic',
                    jsxImportSource: importSource
                }
                : {
                    ...currentEsbuild,
                    jsx: 'transform',
                    jsxFragment: '__airx__.Fragment',
                    jsxFactory: '__airx__.createElement',
                    jsxInject: "import * as __airx__ from 'airx'"
                };
            return {
                ...config,
                esbuild: nextEsbuild
            };
        },
    };
}
export default VitePluginAirx;
//# sourceMappingURL=index.js.map