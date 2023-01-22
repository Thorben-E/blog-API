import { useEffect } from 'react'
import './App.css'

function App() {
  const [backendData, setBackendData] = ([{}]);

  useEffect(() => {
    fetch('/api', { })
      .then(function(response) {
        return response.json()
      })
      .then(function(data) {
        setBackendData(data)
      })
  }, [])

  return (
    <div className="App">
      {console.log(backendData)}
      {(typeof backendData !== 'undefined') ? (
        <p>Loading...</p> )
        : (
          backendData.users.map((user, i) => {
            <p key={i}>user</p>
          })
      )}
    </div>
  )
}

export default App
