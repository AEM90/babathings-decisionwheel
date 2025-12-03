# babathings-decisionwheel
Custom decision wheel for personal use across multiple subdomains

## Features

- 🎡 **Interactive Decision Wheel** - Colorful, animated wheel for making decisions
- 🔄 **Auto-replication** - Automatically replicates options to fill 8 slots when less than 8 are provided
- 🎲 **Fair Randomness** - Uses cryptographic random number generation for truly random results
- ⏱️ **Roulette Animation** - Smooth 6-second spin with realistic deceleration
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Professional UI** - Modern gradient design with smooth animations

## Usage

1. Open `index.html` in a web browser
2. Enter your options in the text area (one per line)
3. Click "UPDATE WHEEL" to refresh the wheel (optional - updates automatically)
4. Click "SPIN THE WHEEL" to make a decision
5. Wait for the wheel to stop and see your result

## How It Works

- **Less than 8 options**: Options are automatically replicated to fill 8 slots
  - Example: "Pizza", "Burger", "Sushi" becomes 8 slots with these 3 options repeated
- **8 or more options**: All options are used as-is
  - Example: 10 options will create a wheel with 10 segments

## Deployment

This is a single-file application that can be easily deployed to any subdomain:

1. Copy `index.html` to your web server
2. No build process or dependencies required
3. Works as a standalone template across multiple subdomains

## Technical Details

- Pure HTML/CSS/JavaScript - no external dependencies
- Uses `window.crypto.getRandomValues()` for cryptographic randomness
- Canvas-based rendering for smooth animations
- 5-8 full rotations with cubic ease-out deceleration
- Responsive design with mobile support
