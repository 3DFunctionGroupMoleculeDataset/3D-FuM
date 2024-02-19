import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import { fileURLToPath } from "url";

export default defineConfig({
    // base:"3DFunctionGroupMolecule",
    base:"3D-FuM",
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