import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  return{
    plugins: [svgr(), react(), tsconfigPaths()],
    publicDir : "public", 
    build: {
      outDir: mode == 'production' ? './dist' : `./dist_${mode}`,
      emptyOutDir: true,
    }
  }
})
