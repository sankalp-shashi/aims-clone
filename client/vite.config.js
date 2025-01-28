import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/dashboard': {
                target: 'http://localhost:5000', // Backend server
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
