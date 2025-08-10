import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`)
  const [review, setReview] = useState(``)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setLoading(true)        // start loader
    setReview("")           // clear old review
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setReview(response.data)
    } catch (error) {
      setReview("❌ Error fetching review")
    }
    setLoading(false)       // stop loader
  }

  return (
    <>
      <header>AI Code Review Tool</header>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={14}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 15,
                background: "#0c0c0c",
                minHeight: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review-btn">Review Code</div>
        </div>

        <div className="right">
          {loading ? (
            <p style={{ opacity: 0.7, fontStyle: "italic" }}>⏳ Review is processing...</p>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  )
}

export default App
