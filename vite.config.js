import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

export default defineConfig({
    base:"vue3_page_test",
    resolve:{
        alias:{
            // '@':path.resolve(__dirname,'src'),
        }
    },
    server:{
        port:8080
    },
    plugins:[vue()]
})