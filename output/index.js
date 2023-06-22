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