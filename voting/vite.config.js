import react from '@vitejs/plugin-react'
import withMT from "@material-tailwind/react/utils/withMT";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default withMT({
  plugins: [react()],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
})
