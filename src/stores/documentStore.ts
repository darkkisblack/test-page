import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Document } from '@/types/document'
import { apiService } from '@/services/api'

export const useDocumentStore = defineStore('document', () => {
  // State
  const allDocuments = ref<Document[]>([])
  const filteredDocuments = ref<Document[]>([])
  const selectedDocument = ref<Document | null>(null)
  const searchQuery = ref('')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const hasDocuments = computed(() => filteredDocuments.value.length > 0)
  const selectedDocumentHasImage = computed(
    () => selectedDocument.value?.image !== null && selectedDocument.value?.image !== undefined,
  )

  // Actions
  const loadDocuments = async () => {
    isLoading.value = true
    error.value = null

    try {
      console.log('Загружаем документы...')
      const documents = await apiService.getAllDocuments()
      console.log('Получены документы:', documents)
      allDocuments.value = documents
      filteredDocuments.value = structuredClone(documents)
      console.log('allDocuments:', allDocuments.value.length)
      console.log('filteredDocuments:', filteredDocuments.value.length)
    } catch (err) {
      console.error('Ошибка загрузки:', err)
      error.value = err instanceof Error ? err.message : 'Ошибка при загрузке документов'
      allDocuments.value = []
      filteredDocuments.value = []
    } finally {
      isLoading.value = false
    }
  }

  const filterDocuments = async (query: string) => {
    searchQuery.value = query

    if (!query.trim()) {
      filteredDocuments.value = allDocuments.value
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const documents = await apiService.searchDocuments(query)
      filteredDocuments.value = documents
    } catch (err) {
      console.error('Ошибка поиска:', err)
      error.value = err instanceof Error ? err.message : 'Ошибка при поиске документов'
      filteredDocuments.value = []
    } finally {
      isLoading.value = false
    }
  }

  const selectDocument = (document: Document) => {
    selectedDocument.value = document
  }

  const downloadDocument = () => {
    if (!selectedDocument.value) return

    const content = selectedDocument.value.description
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${selectedDocument.value.name}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const deleteDocument = () => {
    if (!selectedDocument.value) return

    allDocuments.value = allDocuments.value.filter((doc) => doc.id !== selectedDocument.value?.id)
    filteredDocuments.value = filteredDocuments.value.filter(
      (doc) => doc.id !== selectedDocument.value?.id,
    )
    selectedDocument.value = null
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    documents: filteredDocuments,
    allDocuments,
    selectedDocument,
    searchQuery,
    isLoading,
    error,
    // Getters
    hasDocuments,
    selectedDocumentHasImage,
    // Actions
    loadDocuments,
    filterDocuments,
    selectDocument,
    downloadDocument,
    deleteDocument,
    clearError,
  }
})
