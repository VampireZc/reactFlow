import { useState } from 'react'
import './App.css'
import FlowDemo from './skin/reactFlow'

function App() {
  const [count, setCount] = useState(0)

  const handleCallApi = async () => {
    try {
      const response = await fetch('/api/hello')
      const text = await response.text()
      console.log(text)
    } catch (error) {
      console.error('调用后端接口失败:', error)
    }
  }

  return (
    <>
      <section id="center">
        <FlowDemo/>
        {/* <button
          type="button"
          className="counter"
          onClick={handleCallApi}
        >
          调用后端接口（结果打印到控制台）
        </button> */}
      </section>
    </>
  )
}

export default App
