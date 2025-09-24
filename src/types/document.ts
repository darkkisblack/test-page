export interface Document {
  id: number
  name: string
  description: string
  image: string | null
}

export interface ApiResponse {
  documents: Document[]
  error?: string
}
