import { useState } from 'react'

export default function InterviewForm({ onCreate }) {
  const [role, setRole] = useState('Frontend Engineer')
  const [level, setLevel] = useState('mid')
  const [description, setDescription] = useState('')
  const [numQuestions, setNumQuestions] = useState(5)
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/interviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, level, description, num_questions: Number(numQuestions) })
      })
      if (!res.ok) throw new Error('Failed to create interview')
      const data = await res.json()
      onCreate?.(data)
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm text-blue-200 mb-1">Role</label>
        <input value={role} onChange={e=>setRole(e.target.value)} className="w-full rounded bg-slate-900/50 border border-blue-500/30 text-white p-2" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Level</label>
          <select value={level} onChange={e=>setLevel(e.target.value)} className="w-full rounded bg-slate-900/50 border border-blue-500/30 text-white p-2">
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Questions</label>
          <input type="number" min={1} max={10} value={numQuestions} onChange={e=>setNumQuestions(e.target.value)} className="w-full rounded bg-slate-900/50 border border-blue-500/30 text-white p-2" />
        </div>
      </div>
      <div>
        <label className="block text-sm text-blue-200 mb-1">Context / JD (optional)</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={3} className="w-full rounded bg-slate-900/50 border border-blue-500/30 text-white p-2" />
      </div>
      <button disabled={loading} className="w-full py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold disabled:opacity-60">
        {loading ? 'Generating...' : 'Generate Interview'}
      </button>
    </form>
  )
}
