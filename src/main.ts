import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router' // Import your router

import './assets/main.css' // Import the main CSS file (includes Tailwind and PrimeIcons)

// Create the app instance
const app = createApp(App)

// Use Pinia for state management
app.use(createPinia())

// Use Vue Router
app.use(router)

// Mount the app to the DOM
app.mount('#app')
