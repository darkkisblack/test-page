<template>
  <div v-if="!selectedDocument" class="empty-state">
    Выберите документ, чтобы посмотреть его содержимое
  </div>
  <div v-else class="document-viewer">
    <div class="document-layout">
      <div class="document-image-section">
        <div v-if="imageLoading" class="image-loading">
          <div class="spinner"></div>
          <span>Загрузка изображения...</span>
        </div>
        <img
          v-show="!imageLoading"
          :src="selectedDocument.image || '/src/assets/icon-placeholder.png'"
          :alt="selectedDocument.name"
          @load="handleImageLoad"
          @error="handleImageError"
        />
      </div>
      <div class="document-content">
        <h2 class="document-title">{{ selectedDocument.name }}</h2>

        <div class="document-actions">
          <button
            class="btn btn-download"
            @click="downloadDocument"
            :disabled="!selectedDocument.description"
          >
            Скачать
          </button>
          <button
            class="btn btn-delete"
            @click="deleteDocument"
            :disabled="!selectedDocument.image || imageError"
          >
            Удалить
          </button>
        </div>

        <div v-if="selectedDocument.description" class="document-description">
          <h4>Описание:</h4>
          <p>{{ selectedDocument.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDocumentStore } from '@/stores/documentStore'

const documentStore = useDocumentStore()
const { selectedDocument } = storeToRefs(documentStore)
const { downloadDocument, deleteDocument } = documentStore

const imageLoading = ref(false)
const imageError = ref(false)

const handleImageLoad = () => {
  imageLoading.value = false
  imageError.value = false
}

const handleImageError = () => {
  imageLoading.value = false
  imageError.value = true
}

watch(selectedDocument, () => {
  imageLoading.value = true
  imageError.value = false
})
</script>

<style scoped>
.empty-state {
  color: #6c757d;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 300px;
}

.document-viewer {
  width: 100%;
}

.document-layout {
  display: flex;
  gap: 61px;
  align-items: flex-start;
}

.document-image-section {
  width: 424px;
  height: 286px;
  position: relative;
  background: #f0f0f0;
  overflow: hidden;
}

.document-image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.document-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.document-title {
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin: 0;
}

.document-actions {
  display: flex;
  gap: 12px;
  margin-top: 14px;
}

.btn {
  width: 114px;
  height: 31px;
  padding: 20px 32px;
  border: 1px solid;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-download {
  background: transparent;
  color: #1976d2;
  border-color: #1976d2;
}

.btn-download:hover:not(:disabled) {
  background: #bbdefb;
}

.btn-delete {
  background: transparent;
  color: #d32f2f;
  border-color: #d32f2f;
}

.btn-delete:hover:not(:disabled) {
  background: #ffcdd2;
}

.image-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #666;
  font-size: 14px;
  background: #f0f0f0;
}

.image-loading .spinner {
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

.document-description {
  text-align: left;
  margin-top: 47px;
}

.document-description h4 {
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin-bottom: 14px;
}

.document-description p {
  font-size: 14px;
  line-height: 100%;
  font-style: regular;
  color: #6c757d;
  text-align: justify;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .document-layout {
    gap: 30px;
  }

  .document-image-section {
    width: 350px;
    height: 250px;
  }
}

@media (max-width: 992px) {
  .document-layout {
    flex-direction: column;
    gap: 25px;
    align-items: center;
  }

  .document-image-section {
    width: 100%;
    max-width: 500px;
    height: 300px;
  }

  .document-content {
    width: 100%;
    max-width: 500px;
  }
}

@media (max-width: 768px) {
  .document-layout {
    gap: 20px;
  }

  .document-image-section {
    height: 250px;
  }

  .document-actions {
    flex-direction: column;
    gap: 12px;
  }

  .btn {
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
  }

  .document-title {
    text-align: center;
  }

  .document-description {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .document-image-section {
    height: 200px;
  }

  .document-title {
    font-size: 14px;
  }

  .btn {
    height: 40px;
    font-size: 13px;
  }

  .document-description h4 {
    font-size: 14px;
  }

  .document-description p {
    font-size: 13px;
  }
}
</style>
