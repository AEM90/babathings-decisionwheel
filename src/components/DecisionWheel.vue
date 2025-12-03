<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  defaultOptions: {
    type: Array,
    default: () => ['Option 1', 'Option 2', 'Option 3', 'Option 4']
  }
})

const canvas = ref(null)
const optionsInput = ref('')
const spinBtn = ref(null)
const resultText = ref('')
const resultSection = ref(null)

let ctx = null
let options = []
let currentRotation = 0
let isSpinning = false

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
  '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
]

const initCanvas = () => {
  const size = 400
  canvas.value.width = size
  canvas.value.height = size
  ctx = canvas.value.getContext('2d')
}

const updateOptions = () => {
  const input = optionsInput.value
  const rawOptions = input.split('\n')
    .map(opt => opt.trim())
    .filter(opt => opt.length > 0)

  if (rawOptions.length === 0) {
    options = ['Option 1', 'Option 2', 'Option 3', 'Option 4',
               'Option 5', 'Option 6', 'Option 7', 'Option 8']
  } else if (rawOptions.length < 8) {
    // Replicate options to fill 8 slots
    options = []
    while (options.length < 8) {
      for (let i = 0; i < rawOptions.length && options.length < 8; i++) {
        options.push(rawOptions[i])
      }
    }
  } else {
    options = rawOptions
  }

  drawWheel()
}

const drawWheel = () => {
  if (!ctx || !canvas.value) return
  
  const size = canvas.value.width
  const centerX = size / 2
  const centerY = size / 2
  const radius = size / 2 - 10
  const numSegments = options.length
  const anglePerSegment = (2 * Math.PI) / numSegments

  // Clear canvas
  ctx.clearRect(0, 0, size, size)

  // Save context state
  ctx.save()
  ctx.translate(centerX, centerY)
  ctx.rotate(currentRotation)

  // Draw segments
  for (let i = 0; i < numSegments; i++) {
    const startAngle = i * anglePerSegment
    const endAngle = startAngle + anglePerSegment

    // Draw segment
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.arc(0, 0, radius, startAngle, endAngle)
    ctx.closePath()
    ctx.fillStyle = colors[i % colors.length]
    ctx.fill()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw text
    ctx.save()
    ctx.rotate(startAngle + anglePerSegment / 2)
    ctx.textAlign = 'center'
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 16px Arial'
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
    ctx.shadowBlur = 3
    ctx.shadowOffsetX = 1
    ctx.shadowOffsetY = 1

    const text = options[i]
    const maxWidth = radius - 40
    const textRadius = radius * 0.7

    // Truncate text if too long
    let displayText = text
    if (ctx.measureText(text).width > maxWidth) {
      while (ctx.measureText(displayText + '...').width > maxWidth && displayText.length > 0) {
        displayText = displayText.slice(0, -1)
      }
      displayText += '...'
    }

    ctx.fillText(displayText, textRadius, 5)
    ctx.restore()
  }

  // Draw center circle
  ctx.beginPath()
  ctx.arc(0, 0, 30, 0, 2 * Math.PI)
  ctx.fillStyle = '#fff'
  ctx.fill()
  ctx.strokeStyle = '#333'
  ctx.lineWidth = 3
  ctx.stroke()

  ctx.restore()
}

const spin = () => {
  if (isSpinning) return
  if (options.length === 0) return

  isSpinning = true
  spinBtn.value.disabled = true
  resultSection.value.classList.remove('show')

  // Generate random result with cryptographic randomness
  const crypto = window.crypto || window.msCrypto
  const randomBuffer = new Uint32Array(1)
  crypto.getRandomValues(randomBuffer)
  const randomValue = randomBuffer[0] / (0xFFFFFFFF + 1)

  // Calculate target position
  const selectedIndex = Math.floor(randomValue * options.length)
  const anglePerSegment = (2 * Math.PI) / options.length

  const targetAngle = -(selectedIndex * anglePerSegment + anglePerSegment / 2)

  // Add multiple full rotations (5-8 spins)
  const minSpins = 5
  const maxSpins = 8
  const numSpins = Math.floor(randomValue * (maxSpins - minSpins + 1)) + minSpins
  const actualSpins = Math.min(numSpins, maxSpins)
  const normalizedRotation = currentRotation % (2 * Math.PI)
  const totalRotation = currentRotation - normalizedRotation + (actualSpins * 2 * Math.PI) + targetAngle

  // Animation
  const duration = 6000
  const startTime = Date.now()
  const startRotation = currentRotation

  const animate = () => {
    const now = Date.now()
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Ease out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3)

    currentRotation = startRotation + (totalRotation - startRotation) * easeProgress
    drawWheel()

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      currentRotation = totalRotation
      drawWheel()
      showResult(selectedIndex)
      isSpinning = false
      spinBtn.value.disabled = false
    }
  }

  animate()
}

const showResult = (index) => {
  resultText.value = options[index]
  resultSection.value.classList.add('show')
}

watch(optionsInput, () => {
  updateOptions()
})

onMounted(() => {
  initCanvas()
  optionsInput.value = props.defaultOptions.join('\n')
  updateOptions()
})
</script>

<template>
  <div class="decision-wheel">
    <div class="content-wrapper">
      <div class="wheel-section">
        <div class="wheel-container">
          <div class="wheel-pointer"></div>
          <canvas ref="canvas" id="wheelCanvas"></canvas>
        </div>
        <button ref="spinBtn" @click="spin" class="spin-button">SPIN THE WHEEL</button>
        <div ref="resultSection" class="result-section">
          <div class="result-label">The wheel has decided:</div>
          <div class="result-text">{{ resultText }}</div>
        </div>
      </div>

      <div class="input-section">
        <div class="input-group">
          <label for="optionsInput">Enter your options:</label>
          <textarea
            v-model="optionsInput"
            id="optionsInput"
            placeholder="Enter each option on a new line&#10;&#10;Example:&#10;Pizza&#10;Burger&#10;Sushi&#10;Pasta"
          ></textarea>
          <div class="help-text">
            Enter one option per line. If you provide less than 8 options, they will be automatically replicated to fill 8 slots.
          </div>
        </div>
        <button @click="updateOptions" class="update-button">UPDATE WHEEL</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.decision-wheel {
  width: 100%;
}

.content-wrapper {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
}

.wheel-section {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wheel-container {
  position: relative;
  width: 400px;
  height: 400px;
  margin-bottom: 20px;
}

#wheelCanvas {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.wheel-pointer {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 40px solid #ff4444;
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.3));
  z-index: 10;
}

.input-section {
  flex: 1;
  min-width: 300px;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: var(--text-primary);
  font-weight: 600;
}

textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 150px;
  transition: var(--transition);
  background-color: var(--surface-color);
  color: var(--text-primary);
}

textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.help-text {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 5px;
}

.spin-button,
.update-button {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  margin-bottom: 10px;
}

.spin-button:hover,
.update-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.spin-button:active,
.update-button:active {
  transform: translateY(0);
}

.spin-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}

.result-section {
  margin-top: 20px;
  padding: 20px;
  background: var(--surface-color);
  border-radius: var(--border-radius);
  text-align: center;
  display: none;
  box-shadow: var(--shadow-md);
}

.result-section.show {
  display: block;
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-text {
  font-size: 1.5em;
  color: var(--text-primary);
  font-weight: 600;
}

.result-label {
  font-size: 1em;
  color: var(--text-secondary);
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .wheel-container {
    width: 300px;
    height: 300px;
  }

  .content-wrapper {
    flex-direction: column;
  }
}
</style>
