import glsl from 'vite-plugin-glsl'
import { glslify } from 'vite3-plugin-glslify'
import glslifyRollup from "rollup-plugin-glslify";
import { defineConfig } from 'vite'
import requireTransform from 'vite-plugin-require-transform'




export default defineConfig({
    publicDir: './public', 
    plugins: [
        glsl(),
    ], 
})