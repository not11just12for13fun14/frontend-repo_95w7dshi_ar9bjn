import { useState } from 'react'

function AnswerCard({ q, idx, value, onChange }) {
  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
      <div className="text-blue-200 mb-2 font-medium">Q{idx + 1}. {q.text}</div>
      <textarea
        value={value}
        onChange={(e)=>onChange(idx, e.target.value)}
        rows={4}
        className="w-full rounded bg-slate-900/50 border border-blue-500/30 text-white p-2"
        placeholder="Type your answer here..."
      />
    </div>
  )
}

export default function InterviewRunner({ interview, onEvaluated }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [name, setName] = useState('')
  const [answers, setAnswers] = useState(Array.from({length: interview?.questions?.length || 0}, ()=>''))
  const [loading, setLoading] = useState(false)

  const onChange = (idx, v) => {
    const next = [...answers]
    next[idx] = v
    setAnswers(next)
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interview_id: interview.id, candidate_name: name, answers })
      })
      if (!res.ok) throw new Error('Failed to evaluate')
      const data = await res.json()
      onEvaluated?.(data)
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm text-blue-200 mb-1">Your name</label>
        <input value={name} onChange={e=>setName(e.target.value)} className="w-full rounded bg-slate-900/50 border border-blue-500/30 text-white p-2" placeholder="Jane Doe" />
      </div>

      <div className="space-y-4">
        {interview.questions.map((q, idx)=>(
          <AnswerCard key={idx} q={q} idx={idx} value={answers[idx]} onChange={onChange} />
        ))}
      </div>

      <button disabled={loading} className="w-full py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold disabled:opacity-60">
        {loading ? 'Scoring...' : 'Submit answers for evaluation'}
      </button>
    </form>
  )
}
