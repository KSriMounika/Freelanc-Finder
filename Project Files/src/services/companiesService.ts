
import { supabase } from '@/integrations/supabase/client'

export interface Company {
  id: number
  name: string
  logo?: string
  industry: string
  size: string
  location: string
  rating: number
  reviews: number
  description: string
  active_projects: number
  total_hires: number
  verified: boolean
  skills: string[]
  created_at?: string
}

export const companiesService = {
  async getCompanies(filters: {
    searchTerm?: string
    industry?: string
    size?: string
    offset?: number
    limit?: number
  }) {
    let query = supabase
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters.searchTerm) {
      query = query.or(`name.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`)
    }

    if (filters.industry && filters.industry !== 'all') {
      query = query.eq('industry', filters.industry)
    }

    if (filters.size && filters.size !== 'all') {
      query = query.eq('size', filters.size)
    }

    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 6) - 1)
    } else {
      query = query.limit(filters.limit || 6)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching companies:', error)
      throw error
    }

    return { data: data || [], count: count || 0 }
  },

  async getTotalCount() {
    const { count, error } = await supabase
      .from('companies')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Error getting total count:', error)
      return 0
    }

    return count || 0
  }
}
