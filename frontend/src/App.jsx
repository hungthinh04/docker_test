import { useState, useEffect } from 'react'
import api from './api'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await api.get('/hello', {
        params: { message: message || undefined }
      })
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + Node.js Full Stack App</h1>
        {data && (
          <div>
            <p>Message from backend: {data.message}</p>
            <p>Time: {data.timestamp}</p>
          </div>
        )}
        <div className="input-section">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message..."
          />
          <button onClick={fetchData}>Refresh</button>
        </div>
      </header>
    </div>
  )
}

export default App

