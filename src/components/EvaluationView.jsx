export default function EvaluationView({ evaluation, onReset }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-6">
        <div className="text-2xl font-bold text-white mb-2">Overall score: {evaluation.total_score}</div>
        <div className="text-blue-200">Verdict: {evaluation.verdict}</div>
      </div>

      <div className="space-y-4">
        {evaluation.per_question_scores.map((s, i) => (
          <div key={i} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
            <div className="text-white font-semibold mb-1">Question {i + 1}</div>
            <div className="text-blue-200 text-sm mb-1">Score: {s}</div>
            <div className="text-blue-300 text-sm">{evaluation.per_question_feedback[i]}</div>
          </div>
        ))}
      </div>

      <button onClick={onReset} className="w-full py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold">Start a new interview</button>
    </div>
  )
}
