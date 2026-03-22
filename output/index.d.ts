import { UserConfig } from 'vite';
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
export declare function VitePluginAirx(): {
    name: string;
    config(config: UserConfig, env: {
        mode: string;
        command: string;
    }): UserConfig;
};
export default VitePluginAirx;
