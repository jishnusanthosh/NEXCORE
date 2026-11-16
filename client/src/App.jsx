
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import API from './services/api'

function Home() {
  const [serverMessage, setServerMessage] = useState('Connecting...')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await API.get('/api/health')

        setServerMessage(response.data.message)
      } catch (error) {
        setServerMessage('Backend connection failed')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    checkServer()
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">

      <h1 className="text-5xl md:text-7xl font-bold text-blue-500">
        NEXCORE
      </h1>

      <p className="mt-4 text-gray-400 text-lg">
        Powering Your Next Experience.
      </p>

      <div className="mt-10 rounded-xl border border-gray-700 bg-gray-900 p-6 text-center">

        <h2 className="text-xl font-semibold">
          Backend Connection
        </h2>

        <p className="mt-4 text-sm text-gray-300">
          {loading ? 'Checking server...' : serverMessage}
        </p>

        {!loading && (
          <p className={`mt-3 text-sm font-medium ${
            serverMessage.includes('successfully')
              ? 'text-green-400'
              : 'text-red-400'
          }`}>
            {serverMessage.includes('successfully')
              ? '● Connected'
              : '● Disconnected'}
          </p>
        )}

      </div>

    </main>
  )
}

function Products() {
  return <h1 className="p-10 text-3xl">Products Page</h1>
}

function Login() {
  return <h1 className="p-10 text-3xl">Login Page</h1>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
