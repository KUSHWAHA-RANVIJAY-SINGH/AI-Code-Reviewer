import { useState, useEffect } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import Editor from "@monaco-editor/react"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import './App.css'

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript', icon: '📜' },
  { value: 'python', label: 'Python', icon: '🐍' },
  { value: 'java', label: 'Java', icon: '☕' },
  { value: 'cpp', label: 'C++', icon: '⚙️' },
  { value: 'csharp', label: 'C#', icon: '🔷' },
  { value: 'typescript', label: 'TypeScript', icon: '📘' },
  { value: 'go', label: 'Go', icon: '🐹' },
  { value: 'rust', label: 'Rust', icon: '🦀' },
]

function App() {
  const [code, setCode] = useState('')
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('appTheme') || 'dark'
  })
  const [showWelcome, setShowWelcome] = useState(true)
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('reviewHistory')
    return saved ? JSON.parse(saved) : []
  })

  // Initialize Gemini AI client
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_KEY || '')

  useEffect(() => {
    localStorage.setItem('appTheme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    if (code.trim()) {
      setShowWelcome(false)
    }
  }, [code])

  const handleReview = async () => {
    if (!code.trim()) {
      setError('Please enter some code to review')
      return
    }

    if (!import.meta.env.VITE_GOOGLE_GEMINI_KEY) {
      setError('❌ Gemini API key is not configured. Please add VITE_GOOGLE_GEMINI_KEY to your .env.local file.')
      return
    }

    setLoading(true)
    setError('')
    setReview('')
    setShowWelcome(false)

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

      const prompt = `You are an expert code reviewer with 7+ years of development experience.

Review the following ${language} code and provide:
1. Summary of what the code does
2. Issues found (bugs, performance, security, readability)
3. Suggestions for improvement
4. Best practices recommendations
5. Suggested refactored code when applicable

Code to review:
\`\`\`${language}
${code}
\`\`\`

Provide your review in markdown format.`

      const result = await model.generateContent(prompt)
      const text = result.response.text()
      setReview(text)

      // Save to history
      const newHistory = [
        {
          id: Date.now(),
          language,
          code: code.substring(0, 100),
          timestamp: new Date().toLocaleString(),
        },
        ...history.slice(0, 9),
      ]
      setHistory(newHistory)
      localStorage.setItem('reviewHistory', JSON.stringify(newHistory))
    } catch (err) {
      console.error('Gemini API Error:', err)
      setError(
        err.message ||
        'Error generating review. Please check your API key and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleReview()
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const clearCode = () => {
    setCode('')
    setReview('')
    setError('')
    setShowWelcome(true)
  }

  const deleteHistory = () => {
    if (window.confirm('Are you sure you want to delete all review history?')) {
      setHistory([])
      localStorage.removeItem('reviewHistory')
    }
  }

  const loadFromHistory = (item) => {
    setCode(item.code)
    setLanguage(item.language)
  }

  return (
    <div className="app" data-theme={theme}>
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <h1>🤖 AI Code Reviewer</h1>
            <p className="subtitle">Get intelligent code reviews powered by AI</p>
          </div>
          <div className="header-right">
            <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="editor-panel">
          <div className="panel-header">
            <h2>Code Input</h2>
            <div className="language-selector">
              <label>Language:</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="language-select"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.icon} {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Editor
            height="calc(100% - 120px)"
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 14,
              fontFamily: '"Fira Code", monospace',
            }}
          />

          <div className="button-group">
            <button
              className="review-button primary"
              onClick={handleReview}
              disabled={loading}
            >
              {loading ? '⏳ Processing...' : '🚀 Review Code'}
            </button>
            <button
              className="review-button secondary"
              onClick={clearCode}
              disabled={loading}
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        <div className="review-panel">
          <div className="panel-header">
            <h2>Review Results</h2>
            {history.length > 0 && (
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button
                  className="delete-history-btn"
                  onClick={deleteHistory}
                  title="Delete all review history"
                >
                  🗑️ Clear History
                </button>
                <div className="history-badge">{history.length} reviews</div>
              </div>
            )}
          </div>

          <div className="review-content">
            {showWelcome && !code.trim() && (
              <div className="welcome-state">
                <div className="welcome-icon">👋</div>
                <h3>Welcome to AI Code Reviewer</h3>
                <p>Paste or write your code in the editor on the left, select the language, and click "Review Code" to get started.</p>
                <div className="welcome-tips">
                  <h4>💡 Quick Tips:</h4>
                  <ul>
                    <li>Supports multiple programming languages</li>
                    <li>Press Ctrl+Enter to review instantly</li>
                    <li>Your reviews are saved in the history</li>
                    <li>Toggle between light and dark mode</li>
                  </ul>
                </div>
              </div>
            )}

            {error && (
              <div className="error-state">
                <div className="error-icon">❌</div>
                <p className="error-message">{error}</p>
                <button className="retry-button" onClick={handleReview}>
                  🔄 Retry
                </button>
              </div>
            )}

            {loading && (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Analyzing your code...</p>
              </div>
            )}

            {review && (
              <div className="markdown-content">
                <Markdown rehypePlugins={[rehypeHighlight]}>
                  {review}
                </Markdown>
              </div>
            )}

            {history.length > 0 && !review && (
              <div className="history-section">
                <h4>📜 Recent Reviews</h4>
                <div className="history-list">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="history-item"
                      onClick={() => loadFromHistory(item)}
                    >
                      <span className="history-lang">{item.language}</span>
                      <span className="history-time">{item.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
