<script setup>
const props = defineProps({
  homeUrl: {
    type: String,
    default: 'https://babathings.com'
  }
})
</script>

<template>
  <nav class="nav">
    <a :href="homeUrl" class="nav-brand">🎡 BabaThings</a>
    <ul class="nav-links">
      <li>
        <a :href="homeUrl" class="nav-link">← Back to Apps</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: var(--surface-color);
  box-shadow: var(--shadow-sm);
  margin-bottom: 2rem;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition);
}

.nav-brand:hover {
  transform: scale(1.05);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
}

.nav-link:hover {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
}
</style>
