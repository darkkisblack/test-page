import axios from 'axios'
import type { Document } from '@/types/document'

const API_URL = import.meta.env.VITE_API_URL || 'https://test-app-csm.up.railway.app'

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const apiService = {
  async getAllDocuments(): Promise<Document[]> {
    try {
      const response = await api.get('/user/docs')
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(`Ошибка сервера: ${error.response.status}`)
        } else if (error.request) {
          throw new Error('Нет соединения с сервером')
        }
      }
      throw new Error('Неизвестная ошибка при запросе')
    }
  },

  async searchDocuments(query: string): Promise<Document[]> {
    try {
      const response = await api.get(`/user/docs?search=${encodeURIComponent(query)}`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(`Ошибка сервера: ${error.response.status}`)
        } else if (error.request) {
          throw new Error('Нет соединения с сервером')
        }
      }
      throw new Error('Неизвестная ошибка при поиске')
    }
  },
}
