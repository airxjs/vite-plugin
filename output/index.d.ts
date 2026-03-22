import { UserConfig } from 'vite';
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
export declare function VitePluginAirx(options?: AirxPluginOptions): {
    name: string;
    enforce: "pre";
    config(config: UserConfig): {
        esbuild: {
            jsx: string;
            jsxImportSource: string;
            include?: string | RegExp | string[] | RegExp[] | undefined;
            exclude?: string | RegExp | string[] | RegExp[] | undefined;
            jsxInject?: string | undefined;
            minify?: undefined;
            sourcefile?: string | undefined;
            loader?: import("esbuild").Loader | undefined;
            banner?: string | undefined;
            footer?: string | undefined;
            sourcemap?: boolean | "linked" | "inline" | "external" | "both" | undefined;
            legalComments?: "linked" | "inline" | "external" | "none" | "eof" | undefined;
            sourceRoot?: string | undefined;
            sourcesContent?: boolean | undefined;
            format?: import("esbuild").Format | undefined;
            globalName?: string | undefined;
            target?: string | string[] | undefined;
            supported?: Record<string, boolean> | undefined;
            platform?: import("esbuild").Platform | undefined;
            mangleProps?: RegExp | undefined;
            reserveProps?: RegExp | undefined;
            mangleQuoted?: boolean | undefined;
            mangleCache?: Record<string, string | false> | undefined;
            drop?: import("esbuild").Drop[] | undefined;
            dropLabels?: string[] | undefined;
            minifyWhitespace?: boolean | undefined;
            minifyIdentifiers?: boolean | undefined;
            minifySyntax?: boolean | undefined;
            lineLimit?: number | undefined;
            charset?: import("esbuild").Charset | undefined;
            treeShaking?: boolean | undefined;
            ignoreAnnotations?: boolean | undefined;
            jsxFactory?: string | undefined;
            jsxFragment?: string | undefined;
            jsxDev?: boolean | undefined;
            jsxSideEffects?: boolean | undefined;
            define?: {
                [key: string]: string;
            } | undefined;
            pure?: string[] | undefined;
            keepNames?: boolean | undefined;
            color?: boolean | undefined;
            logLevel?: import("esbuild").LogLevel | undefined;
            logLimit?: number | undefined;
            logOverride?: Record<string, import("esbuild").LogLevel> | undefined;
            tsconfigRaw?: string | import("esbuild").TsconfigRaw | undefined;
        } | {
            jsx: string;
            jsxFragment: string;
            jsxFactory: string;
            jsxInject: string;
            include?: string | RegExp | string[] | RegExp[] | undefined;
            exclude?: string | RegExp | string[] | RegExp[] | undefined;
            minify?: undefined;
            sourcefile?: string | undefined;
            loader?: import("esbuild").Loader | undefined;
            banner?: string | undefined;
            footer?: string | undefined;
            sourcemap?: boolean | "linked" | "inline" | "external" | "both" | undefined;
            legalComments?: "linked" | "inline" | "external" | "none" | "eof" | undefined;
            sourceRoot?: string | undefined;
            sourcesContent?: boolean | undefined;
            format?: import("esbuild").Format | undefined;
            globalName?: string | undefined;
            target?: string | string[] | undefined;
            supported?: Record<string, boolean> | undefined;
            platform?: import("esbuild").Platform | undefined;
            mangleProps?: RegExp | undefined;
            reserveProps?: RegExp | undefined;
            mangleQuoted?: boolean | undefined;
            mangleCache?: Record<string, string | false> | undefined;
            drop?: import("esbuild").Drop[] | undefined;
            dropLabels?: string[] | undefined;
            minifyWhitespace?: boolean | undefined;
            minifyIdentifiers?: boolean | undefined;
            minifySyntax?: boolean | undefined;
            lineLimit?: number | undefined;
            charset?: import("esbuild").Charset | undefined;
            treeShaking?: boolean | undefined;
            ignoreAnnotations?: boolean | undefined;
            jsxImportSource?: string | undefined;
            jsxDev?: boolean | undefined;
            jsxSideEffects?: boolean | undefined;
            define?: {
                [key: string]: string;
            } | undefined;
            pure?: string[] | undefined;
            keepNames?: boolean | undefined;
            color?: boolean | undefined;
            logLevel?: import("esbuild").LogLevel | undefined;
            logLimit?: number | undefined;
            logOverride?: Record<string, import("esbuild").LogLevel> | undefined;
            tsconfigRaw?: string | import("esbuild").TsconfigRaw | undefined;
        };
        root?: string | undefined;
        base?: string | undefined;
        publicDir?: string | false | undefined;
        cacheDir?: string | undefined;
        mode?: string | undefined;
        define?: Record<string, any> | undefined;
        plugins?: import("vite").PluginOption[] | undefined;
        resolve?: (import("vite").ResolveOptions & {
            alias?: import("vite").AliasOptions | undefined;
        }) | undefined;
        html?: import("vite").HTMLOptions | undefined;
        css?: import("vite").CSSOptions | undefined;
        json?: import("vite").JsonOptions | undefined;
        assetsInclude?: string | RegExp | (string | RegExp)[] | undefined;
        server?: import("vite").ServerOptions | undefined;
        build?: import("vite").BuildOptions | undefined;
        preview?: import("vite").PreviewOptions | undefined;
        optimizeDeps?: import("vite").DepOptimizationOptions | undefined;
        ssr?: import("vite").SSROptions | undefined;
        experimental?: import("vite").ExperimentalOptions | undefined;
        legacy?: import("vite").LegacyOptions | undefined;
        logLevel?: import("vite").LogLevel | undefined;
        customLogger?: import("vite").Logger | undefined;
        clearScreen?: boolean | undefined;
        envDir?: string | undefined;
        envPrefix?: string | string[] | undefined;
        worker?: {
            format?: "iife" | "es" | undefined;
            plugins?: (() => import("vite").PluginOption[]) | undefined;
            rollupOptions?: Omit<import("rollup").RollupOptions, "plugins" | "input" | "onwarn" | "preserveEntrySignatures"> | undefined;
        } | undefined;
        appType?: import("vite").AppType | undefined;
    };
};
export default VitePluginAirx;
