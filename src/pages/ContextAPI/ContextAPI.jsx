import { Button } from '@/components/Button'
import { createContext, useContext, useState } from 'react'

const CountContext = createContext({})

export default function ContextAPI() {
  const [count, setCount] = useState(0)

  function onIncrement() {
    setCount(count + 1)
  }

  function onDecrement() {
    setCount(count - 1)
  }

  return (
    <main id="main">
      <section className="section-1">
        <div className="container">
          <CountContext.Provider value={{ count, onIncrement, onDecrement }}>
            <Count />
          </CountContext.Provider>
        </div>
      </section>
    </main>
  )
}

function Count() {
  const { count, onIncrement, onDecrement } = useContext(CountContext)

  const formattedCount = `0${count}`.slice(-2)

  return (
    <div className="mx-auto flex h-96 w-96 items-center justify-center border border-gray-500 p-10 text-8xl">
      <Button className="mt-5 flex items-center justify-center pb-2 text-4xl" onClick={onDecrement}>
        -
      </Button>
      <span className="mx-10">{formattedCount}</span>
      <Button className="mt-5 flex items-center justify-center pb-2 text-4xl" onClick={onIncrement}>
        +
      </Button>
    </div>
  )
}
