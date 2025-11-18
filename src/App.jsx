import { useState } from 'react'
import InterviewForm from './components/InterviewForm'
import InterviewRunner from './components/InterviewRunner'
import EvaluationView from './components/EvaluationView'

function App() {
  const [step, setStep] = useState('form')
  const [interview, setInterview] = useState(null)
  const [evaluation, setEvaluation] = useState(null)

  const onCreate = (data) => {
    setInterview(data)
    setStep('run')
  }

  const onEvaluated = (data) => {
    setEvaluation(data)
    setStep('result')
  }

  const reset = () => {
    setStep('form')
    setInterview(null)
    setEvaluation(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]"></div>
      <div className="relative min-h-screen flex items-center justify-center p-6">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">AI Interviewer</h1>
            <p className="text-blue-200">Generate tailored interviews, capture answers, and get instant scoring.</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
            {step === 'form' && <InterviewForm onCreate={onCreate} />}
            {step === 'run' && <InterviewRunner interview={interview} onEvaluated={onEvaluated} />}
            {step === 'result' && <EvaluationView evaluation={evaluation} onReset={reset} />}
          </div>

          <div className="text-center mt-6">
            {step !== 'form' && (
              <button onClick={reset} className="text-blue-300 hover:text-white underline underline-offset-4">Start over</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
