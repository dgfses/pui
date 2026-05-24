// ============================================================
// localStorage Helper untuk menyimpan hasil simulasi phishing
// ============================================================

// Type untuk satu entry hasil simulasi
export interface SimulationResult {
  id: string
  scenarioId: string       // e.g. 'tpl-001'
  scenarioName: string     // e.g. 'Reset Password Office 365'
  status: 'opened' | 'clicked' | 'submitted'
  startedAt: string        // ISO timestamp when user started the scenario
  clickedAt?: string       // ISO timestamp when user clicked phishing link
  submittedAt?: string     // ISO timestamp when user submitted credentials
  completedAt?: string     // ISO timestamp when user finished education page
}

const STORAGE_KEY = 'phishguard_results'

// Get all saved simulation results
export function getSimulationResults(): SimulationResult[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

// Save a new simulation result
export function saveSimulationResult(result: SimulationResult): void {
  const results = getSimulationResults()
  // Update existing or add new
  const existingIndex = results.findIndex(r => r.id === result.id)
  if (existingIndex >= 0) {
    results[existingIndex] = { ...results[existingIndex], ...result }
  } else {
    results.push(result)
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results))
}

// Get results for a specific scenario
export function getResultsByScenario(scenarioId: string): SimulationResult[] {
  return getSimulationResults().filter(r => r.scenarioId === scenarioId)
}

// Clear all results
export function clearSimulationResults(): void {
  localStorage.removeItem(STORAGE_KEY)
}
