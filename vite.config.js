import { defineConfig } from 'vite'

export default defineConfig ({
    base: '/portfolio/',
    root: './',
    build: {
        rollupOptions: {
          output: {
            chunkFileNames: '[name]-[hash].js',
            entryFileNames: '[name]-[hash].js',
            
            assetFileNames: ({name}) => {
              if (/\.(gif|jpe?g|png|svg|glb)$/.test(name ?? '')){
                  return './assets/[name][extname]';
              }
              
              if (/\.css$/.test(name ?? '')) {
                  return '[name]-[hash][extname]';   
              }
     
              // default value
              // ref: https://rollupjs.org/guide/en/#outputassetfilenames
              return 'assets/[name][extname]';
            },
          },
        }
        
      },
})