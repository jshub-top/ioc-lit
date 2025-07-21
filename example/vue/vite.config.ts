import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import swc from "vite-plugin-swc-transform";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        swc({
            swcOptions: {
                jsc: {
                    target: "esnext",
                    transform: {
                        legacyDecorator: true,
                        decoratorMetadata: true,
                    },
                    // externalHelpers: true,
                },
            },
        }),
    ],
});
