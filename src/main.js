import { createApp } from 'vue'
import App from './App.vue'
// Import the central styling plugin (zero-config)
import centralStyling from './assets/central-styling'

createApp(App)
  .use(centralStyling)
  .mount('#app')

