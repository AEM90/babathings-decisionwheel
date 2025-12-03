# Central Styling Integration Guide

This document explains how to integrate the BabaThings Central Styling system into your Vue.js subdomain projects with **zero configuration**.

## 🎯 Overview

The central styling system provides:
- Consistent design language across all BabaThings subdomain apps
- CSS variables for theming (with dark mode support)
- Pre-styled components (buttons, cards, navigation, etc.)
- Zero-config installation and automatic application

## 🚀 Quick Start (Zero-Config)

### Step 1: Copy the Central Styling Files

Copy the entire `src/assets/central-styling` directory to your Vue.js project:

```
your-project/
└── src/
    └── assets/
        └── central-styling/
            ├── central-styles.css
            └── index.js
```

### Step 2: Use the Plugin in main.js

In your `src/main.js` or `src/main.ts`, simply import and use the plugin:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import centralStyling from './assets/central-styling'

createApp(App)
  .use(centralStyling)
  .mount('#app')
```

**That's it!** 🎉 The central styling is now automatically applied to your entire application.

## ✨ What You Get Automatically

Once the plugin is installed, all components in your application automatically have access to:

### CSS Variables

```css
/* Colors */
--primary-color: #6366f1
--primary-dark: #4f46e5
--primary-light: #818cf8
--secondary-color: #10b981
--background-color: #f9fafb
--surface-color: #ffffff
--text-primary: #1f2937
--text-secondary: #6b7280
--border-color: #e5e7eb

/* Shadows */
--shadow-sm
--shadow-md
--shadow-lg
--shadow-xl

/* Border Radius */
--border-radius: 12px
--border-radius-lg: 16px

/* Transitions */
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

### Pre-styled Elements

The following CSS classes are available globally:

- `.container` - Responsive container with max-width
- `.btn` - Styled button with gradient
- `.card` - Card with shadow and hover effects
- `.nav` - Navigation bar
- `.nav-brand` - Brand/logo link
- `.nav-links` - Navigation links list
- `.nav-link` - Individual nav link
- Utility classes: `.text-center`, `.mt-1` through `.mt-4`, `.mb-1` through `.mb-4`

### Dark Mode Support

Dark mode is automatically applied based on user preference using `prefers-color-scheme`.

## 📝 Using in Components

### Example 1: Using CSS Variables

```vue
<template>
  <div class="my-component">
    <h1>Hello World</h1>
  </div>
</template>

<style scoped>
.my-component {
  background-color: var(--surface-color);
  color: var(--text-primary);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
  transition: var(--transition);
}

.my-component:hover {
  box-shadow: var(--shadow-lg);
}
</style>
```

### Example 2: Using Pre-styled Classes

```vue
<template>
  <div class="container">
    <div class="card">
      <h2>My Card</h2>
      <button class="btn">Click Me</button>
    </div>
  </div>
</template>

<!-- No need for scoped styles - the classes are already styled! -->
```

### Example 3: Accessing Theme in JavaScript

The plugin provides theme values through Vue's `provide/inject`:

```vue
<script setup>
import { inject } from 'vue'

const theme = inject('centralStyling')
console.log(theme.colors.primary) // #6366f1
</script>
```

## 🔧 Advanced Configuration

### Debug Mode

Enable debug mode to see when the plugin is installed:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import centralStyling from './assets/central-styling'

createApp(App)
  .use(centralStyling, { debug: true })
  .mount('#app')
```

### Customizing Theme Variables

You can override CSS variables in your own styles:

```css
/* In your App.vue or a global stylesheet */
:root {
  --primary-color: #ff6b6b; /* Override with your color */
  --border-radius: 8px; /* Override with your preference */
}
```

## 📦 What Gets Included

When you use the plugin:

1. **CSS File**: The `central-styles.css` file is automatically imported
2. **No Manual Imports**: You don't need to import CSS in each component
3. **Global Availability**: All styles are available globally throughout your app
4. **No Class Name Conflicts**: All central styling classes use semantic names

## 🎨 Customization Guidelines

### Do's ✅

- Use the provided CSS variables for consistency
- Use the pre-styled classes when possible
- Override variables in your `:root` if needed
- Add component-specific styles in scoped blocks

### Don'ts ❌

- Don't modify the `central-styling` directory files directly
- Don't create conflicting class names (`.btn`, `.card`, etc.)
- Don't use inline styles when CSS variables are available

## 🔗 Navigation Component

To add a link back to the central BabaThings dashboard, use the included `NavBar` component:

```vue
<template>
  <NavBar homeUrl="https://babathings.com" />
  <!-- Your app content -->
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>
```

## 🌐 SEO Considerations

The navigation link back to the central template helps with:
- User flow between subdomain apps
- SEO link juice between domains
- Consistent brand experience

## 📱 Responsive Design

All central styling components are mobile-first and responsive:
- Breakpoint: 768px for tablet/mobile
- Containers adjust automatically
- Navigation collapses on mobile

## 🎯 Benefits of This Approach

1. **Zero Configuration**: Just import and use - no setup required
2. **Consistency**: All apps use the same design system
3. **Maintainability**: Update central styling in one place
4. **Flexibility**: Can override or extend as needed
5. **No Build Step**: CSS is just imported, no compilation needed
6. **Type Safety**: Works with TypeScript without extra configuration

## 🚀 Deployment

The central styling works seamlessly in:
- Development (Vite dev server)
- Production builds
- All modern hosting platforms (Vercel, Netlify, etc.)

No special build configuration needed!

## 🔄 Updating Central Styling

To update the central styling:

1. Get the latest `central-styling` directory
2. Replace your current `src/assets/central-styling` directory
3. No code changes needed - everything updates automatically!

## 📚 Complete Example

See the Decision Wheel component in this project for a complete working example:
- `src/main.js` - Plugin usage
- `src/App.vue` - Using central styling
- `src/components/DecisionWheel.vue` - Component with CSS variables
- `src/components/NavBar.vue` - Navigation component

## 🆘 Troubleshooting

### Styles Not Applying

1. Ensure you've imported and used the plugin in `main.js`
2. Check that the path to `./assets/central-styling` is correct
3. Clear your browser cache and restart the dev server

### CSS Variables Not Working

1. Ensure you're using CSS variables (not SCSS/SASS syntax)
2. Use `var(--variable-name)` syntax
3. Check browser console for CSS errors

### Dark Mode Not Working

1. Check your OS/browser dark mode settings
2. Test with `prefers-color-scheme` media query
3. Verify the dark mode CSS is not being overridden

## 🎉 Success!

You now have a fully integrated central styling system with zero configuration! All future subdomain projects can follow this same simple pattern for consistent design across the BabaThings ecosystem.
