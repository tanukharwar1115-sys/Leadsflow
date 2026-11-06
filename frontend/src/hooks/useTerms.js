import { industryPresets, DEFAULT_INDUSTRY } from '../config/terminology'
import { useAuth } from './useAuth'

// const t = useTerms();  t.lead.plural -> "Leads";  t.property.singular -> "Property" (or "Listing" in other industries)
// Driven by the organization's industry, so each tenant sees its own vocabulary.
export function useTerms() {
  const { organization } = useAuth()
  return industryPresets[organization?.industry] || industryPresets[DEFAULT_INDUSTRY]
}
