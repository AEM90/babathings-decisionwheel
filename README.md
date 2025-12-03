# babathings-decisionwheel

A Vue.js SPA for making decisions with an interactive, animated decision wheel. Part of the BabaThings ecosystem with integrated central styling.

## 🎡 Features

- **Interactive Decision Wheel** - Colorful, animated wheel for making decisions
- **Auto-replication** - Automatically replicates options to fill 8 slots when less than 8 are provided
- **Fair Randomness** - Uses cryptographic random number generation for truly random results
- **Roulette Animation** - Smooth 6-second spin with realistic deceleration
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Modern Vue.js** - Built with Vue 3 and Vite for fast development
- **Central Styling** - Integrated with BabaThings central styling system
- **Zero-Config Styling** - Automatic application of consistent design

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Central Styling Integration

This project uses the **BabaThings Central Styling System** for consistent design across all subdomain apps.

### Zero-Config Usage

The central styling is automatically applied through a Vue plugin:

```javascript
// In src/main.js
import centralStyling from './assets/central-styling'

createApp(App)
  .use(centralStyling)  // That's it!
  .mount('#app')
```

**No manual imports, no configuration, no path manipulation needed!**

For detailed documentation on how to use and customize the central styling, see [CENTRAL_STYLING_INTEGRATION.md](./CENTRAL_STYLING_INTEGRATION.md).

## 📁 Project Structure

```
babathings-decisionwheel/
├── public/                      # Static assets
├── src/
│   ├── assets/
│   │   └── central-styling/    # Central styling system
│   │       ├── central-styles.css
│   │       └── index.js        # Vue plugin
│   ├── components/
│   │   ├── DecisionWheel.vue   # Main decision wheel component
│   │   └── NavBar.vue          # Navigation with link to central template
│   ├── App.vue                 # Root component
│   └── main.js                 # App entry point with central styling
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
├── package.json                 # Dependencies and scripts
├── CENTRAL_STYLING_INTEGRATION.md  # Integration guide
└── README.md                    # This file
```

## 🎯 Usage

1. **Enter Options**: Type your options in the text area (one per line)
2. **Update Wheel**: Click "UPDATE WHEEL" or let it update automatically
3. **Spin**: Click "SPIN THE WHEEL" to make a decision
4. **Wait**: Watch the wheel spin for 6 seconds
5. **Result**: See which option the wheel selected

### Auto-replication Logic

- **Less than 8 options**: Options are automatically replicated to fill 8 slots
  - Example: "Pizza", "Burger", "Sushi" becomes 8 slots with these 3 repeated
- **8 or more options**: All options are used as-is
  - Example: 10 options creates a wheel with 10 segments

## 🏗️ Technical Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Canvas API** - For rendering the animated wheel
- **Web Crypto API** - For cryptographically secure randomness
- **CSS Variables** - For themeable, consistent styling

## 🔗 Navigation

The app includes a navigation bar with a link back to the central BabaThings template at `https://babathings.com`. This:
- Improves user flow between subdomain apps
- Helps with SEO
- Maintains consistent branding

## 🌙 Dark Mode

Dark mode is automatically supported via the central styling system using CSS `prefers-color-scheme` media query.

## 📱 Responsive Breakpoints

- **Desktop**: Full layout with side-by-side wheel and options
- **Tablet** (< 768px): Stacked layout
- **Mobile** (< 480px): Optimized for small screens

## 🎨 Customization

### Styling

The app uses CSS variables from the central styling system:

```css
--primary-color: #6366f1
--secondary-color: #10b981
--background-color: #f9fafb
--surface-color: #ffffff
/* ... and more */
```

Override these in your components to customize:

```vue
<style>
:root {
  --primary-color: #your-color;
}
</style>
```

### Default Options

Customize default options in `DecisionWheel.vue`:

```vue
<DecisionWheel 
  :defaultOptions="['Custom 1', 'Custom 2', 'Custom 3']" 
/>
```

## 🚀 Deployment

### Build

```bash
npm run build
```

This creates a `dist/` directory with optimized production files.

### Hosting Options

Deploy to any static hosting service:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist/` folder or connect to GitHub
- **GitHub Pages**: Deploy `dist/` to `gh-pages` branch
- **Cloudflare Pages**: Connect repo and deploy

### Environment Variables

No environment variables required for basic functionality.

## 🔒 Security

- Uses `window.crypto.getRandomValues()` for cryptographically secure randomness
- No external dependencies for core functionality
- All links use `rel="noopener noreferrer"`

## 📊 How It Works

### Random Selection Algorithm

1. Generate cryptographically secure random value
2. Map to wheel segment index
3. Calculate rotation needed to align segment with pointer
4. Add 5-8 full rotations for dramatic effect
5. Animate with cubic ease-out for natural deceleration

### Animation

- **Duration**: 6 seconds (similar to real roulette wheels)
- **Easing**: Cubic ease-out for realistic deceleration
- **FPS**: 60fps using `requestAnimationFrame`

## 🤝 Contributing to BabaThings Ecosystem

To add your own subdomain app to the BabaThings ecosystem:

1. Create your Vue.js app
2. Copy the `src/assets/central-styling` directory
3. Use the plugin in `main.js`
4. Add `NavBar` component with link to central template
5. Deploy to your subdomain
6. Add your app to the central template configuration

See [CENTRAL_STYLING_INTEGRATION.md](./CENTRAL_STYLING_INTEGRATION.md) for detailed instructions.

## 📄 License

This project is part of the BabaThings ecosystem.

## 🔗 Related Projects

- [BabaThings Central Styling](https://github.com/AEM90/babathings-central-styling) - Central template and styling system
- Other BabaThings subdomain apps (AtomWatch, MoneyBurn, etc.)

---

**Made with ❤️ for decision-making and fun**

