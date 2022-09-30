import glsl from 'vite-plugin-glsl'
import glslify from 'vite3-plugin-glslify'
import { defineConfig } from 'vite'

export default defineConfig({
    publicDir: './public', 
    plugins: [glsl()], 
})
