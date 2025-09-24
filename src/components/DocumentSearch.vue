<template>
  <div class="search-section">
    <h3>Поиск документа</h3>
    <input
      v-model="searchQuery"
      @input="handleSearch"
      class="search-input"
      type="text"
      placeholder="Введите ID документа"
    />
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDocumentStore } from '@/stores/documentStore'

const documentStore = useDocumentStore()
const { searchQuery, error, filterDocuments } = documentStore

let searchTimeout: number | null = null

const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement

  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  searchTimeout = setTimeout(async () => {
    await filterDocuments(target.value)
  }, 300)
}
</script>

<style scoped>
.search-section {
  padding: 0 22px 0 20px;
}

.search-section h3 {
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  color: #000;
  margin-bottom: 15px;
}

.search-input {
  width: 240px;
  height: 49px;
  padding: 16px 24px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
}

.search-input::placeholder {
  color: #999;
}

.error-message {
  color: #d32f2f;
  background: #ffebee;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 14px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .search-input {
    width: 100%;
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .search-input {
    height: 45px;
    padding: 12px 16px;
    font-size: 13px;
  }

  .error-message {
    padding: 10px 12px;
    font-size: 13px;
    margin-bottom: 12px;
  }
}
</style>
