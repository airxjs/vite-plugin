/**
 * 创建 Airx 的 Vite 插件。
 *
 * 插件会将 JSX 转换目标设置为 Airx 运行时：
 * - jsxFactory: __airx__.createElement
 * - jsxFragment: __airx__.Fragment
 * - jsxInject: import * as __airx__ from 'airx'
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
export function VitePluginAirx() {
    return {
        name: 'airx',
        config(config, env) {
            config.esbuild = {
                ...config.esbuild,
                jsx: 'transform',
                jsxFragment: '__airx__.Fragment',
                jsxFactory: '__airx__.createElement',
                jsxInject: 'import * as __airx__ from \'airx\''
            };
            return config;
        },
    };
}
export default VitePluginAirx;
//# sourceMappingURL=index.js.map