<script setup>
import NavBar from './components/NavBar.vue'
import DecisionWheel from './components/DecisionWheel.vue'
</script>

<template>
  <div class="app-container">
    <NavBar homeUrl="https://babathings.com" />
    <div class="container">
      <div class="header">
        <h1>🎡 Decision Wheel</h1>
        <p class="tagline">Spin the wheel to make decisions and choose random options</p>
      </div>
      <div class="main-content">
        <DecisionWheel />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
}

.tagline {
  font-size: 1.125rem;
  color: var(--text-secondary);
  font-weight: 400;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }
  
  .tagline {
    font-size: 1rem;
  }
}
</style>
