<template>
  <header class="header">
    <div>
      <div class="app-title">MyApp</div>
    </div>
    <div class="username">Username</div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.header {
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  font-size: 32px;
  font-weight: 700;
  line-height: 100%;
  color: #000;
  margin-top: 5px;
}

.username {
  font-size: 16px;
  font-style: regular;
  font-weight: 400;
  letter-spacing: 0%;
  color: #000;
}

@media (max-width: 480px) {
  .header {
    padding: 15px 20px;
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
}
</style>
