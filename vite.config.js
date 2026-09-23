import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Locally, /api/doctors is forwarded to the real doctor API.
// That avoids the CORS error you get when the browser calls demo.orvenahealth.com itself.
const doctorProxy = {
  '/api/doctors': {
    target: 'https://demo.orvenahealth.com',
    changeOrigin: true,
    rewrite: () => '/appservice.asmx/getdoctorlist',
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: doctorProxy },
  preview: { proxy: doctorProxy },
})
