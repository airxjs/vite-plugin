import { type Plugin } from 'vite';
export interface AirxPluginOptions {
    /**
     * JSX 运行时模式。
     * - automatic: 走 jsx-runtime / jsx-dev-runtime（推荐）
     * - classic: 走 createElement + Fragment 注入（兼容旧项目）
     */
    runtime?: 'automatic' | 'classic';
    /**
     * automatic 模式下的导入源，对应 esbuild 的 jsxImportSource。
     * 默认值: airx
     */
    importSource?: string;
}
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
export declare function VitePluginAirx(options?: AirxPluginOptions): Plugin;
export default VitePluginAirx;
