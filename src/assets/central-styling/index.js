/**
 * BabaThings Central Styling Plugin for Vue.js
 * 
 * A zero-config plugin that automatically applies central styling to Vue applications.
 * Simply import and use this plugin in main.js/main.ts.
 * 
 * @example
 * import { createApp } from 'vue'
 * import App from './App.vue'
 * import centralStyling from './assets/central-styling'
 * 
 * createApp(App)
 *   .use(centralStyling)
 *   .mount('#app')
 */

import './central-styles.css'

/**
 * Central Styling Plugin
 * Automatically applies central styling without any configuration
 */
export default {
  install(app, options = {}) {
    // Plugin is installed
    // The CSS is already imported, so styles are automatically applied
    
    // Optionally, you can add global properties or methods here
    // For example, theme colors or utility functions
    
    if (options.debug) {
      console.log('BabaThings Central Styling Plugin installed')
    }
    
    // Provide theme variables as a reactive object (optional)
    app.provide('centralStyling', {
      colors: {
        primary: '#6366f1',
        secondary: '#10b981',
        background: '#f9fafb',
        surface: '#ffffff',
        textPrimary: '#1f2937',
        textSecondary: '#6b7280'
      },
      // Can be used in components: const theme = inject('centralStyling')
    })
  }
}
