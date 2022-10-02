import glsl from 'vite-plugin-glsl'
import { defineConfig } from 'vite'
import { glslify } from 'vite3-plugin-glslify'

export default defineConfig({
    publicDir: './public', 
    plugins: [
        glsl(),
    ], 
})
