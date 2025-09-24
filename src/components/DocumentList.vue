<template>
  <div class="results-section">
    <h3>Результаты</h3>
    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <span>Загрузка...</span>
    </div>
    <div v-else-if="!hasDocuments" class="no-results">Ничего не найдено</div>
    <div v-else class="document-list">
      <div
        v-for="document of documents"
        :key="document.id"
        :class="['document-item', { selected: selectedDocument?.id === document.id }]"
        @click="selectDocument(document)"
      >
        <div class="document-icon">
          <img src="/src/assets/icon-placeholder.png" alt="Document" />
        </div>
        <div class="document-info">
          <div class="document-name">{{ document.name }}</div>
          <div class="document-size">12 MB</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useDocumentStore } from '@/stores/documentStore'

const documentStore = useDocumentStore()

const { documents, selectedDocument, isLoading, hasDocuments } = storeToRefs(documentStore)
const { selectDocument, loadDocuments } = documentStore

onMounted(async () => {
  await loadDocuments()
})
</script>

<style scoped>
.results-section h3 {
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  color: #000;
  margin-bottom: 18px;
  padding: 0 22px 0 20px;
}

.document-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-height: 300px;
  overflow-y: auto;
  padding: 0 22px 0 20px;
}

.document-item {
  display: flex;
  align-items: center;
  width: 240px;
  height: 70px;
  gap: 18px;
  padding: 12px 12px 12px 0;
  cursor: pointer;
  transition: all 0.2s;
  background: #fff;
  border-radius: 0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.document-item:hover {
  box-shadow: 0 0 15px 0 rgba(0, 123, 255, 0.3);
  transform: translateY(-1px);
}

.document-item.selected {
  background: #007bff;
  color: #fff;
}

.document-icon {
  width: 70px;
  height: 70px;
  background: #fff;
  border-right: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  clip-path: inset(0 0 0 0);
}

.document-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
}

.document-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 0 10px 10px 0;
}

.document-name {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.document-size {
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
  color: #6c757d;
}

.document-item.selected .document-size {
  color: rgba(255, 255, 255, 0.8);
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #666;
  font-size: 14px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.no-results {
  color: #999;
  font-size: 14px;
  text-align: left;
  padding: 0 22px 0 20px;
}

@media (max-width: 768px) {
  .document-item {
    width: 100%;
    height: 60px;
    max-width: 100%;
  }

  .document-icon {
    width: 60px;
    height: 60px;
  }

  .document-name {
    font-size: 13px;
  }

  .document-size {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .document-item {
    height: 60px;
    padding: 8px 8px 8px 0;
    gap: 12px;
  }

  .document-icon {
    width: 50px;
    height: 50px;
  }

  .document-name {
    font-size: 12px;
    margin-bottom: 4px;
  }

  .document-size {
    font-size: 12px;
  }
}
</style>
