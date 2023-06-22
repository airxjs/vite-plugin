import { UserConfig } from 'vite';
export declare function VitePluginAirx(): {
    name: string;
    config(config: UserConfig, env: {
        mode: string;
        command: string;
    }): UserConfig;
};
export default VitePluginAirx;
