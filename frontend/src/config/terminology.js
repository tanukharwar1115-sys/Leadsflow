// Industry vocabulary. UI code must use these terms (useTerms()) instead of hardcoding
// "Property" / "Agent" etc., so a new industry = a new preset here, not a UI rewrite.
const term = (singular, plural) => ({ singular, plural })

export const industryPresets = {
  real_estate: {
    label: 'Real estate',
    lead: term('Lead', 'Leads'),
    property: term('Property', 'Properties'),
    agent: term('Agent', 'Agents'),
    appointment: term('Appointment', 'Appointments'),
  },
  // Neutral fallback / template for future verticals (education, automotive, clinics...).
  generic: {
    label: 'General business',
    lead: term('Lead', 'Leads'),
    property: term('Listing', 'Listings'),
    agent: term('Team member', 'Team members'),
    appointment: term('Appointment', 'Appointments'),
  },
}

export const DEFAULT_INDUSTRY = 'real_estate'
