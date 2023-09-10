import { Children, cloneElement, createContext, useContext, useState } from 'react'
import { twJoin } from 'tailwind-merge'

// 1. Create a context
const AccordionContext = createContext({ activeContext: -1 })

// 2. Create parent component
export default function Accordion({ children }) {
  const [activeContent, setActiveContent] = useState(-1)

  function handleToggleContent(index) {
    setActiveContent(index === activeContent ? -1 : index)
  }

  return (
    <AccordionContext.Provider value={{ activeContent, handleToggleContent }}>
      {Children.map(children, (child, i) => cloneElement(child, { index: i }))}
    </AccordionContext.Provider>
  )
}

// 3. Create child components to help implementing the common task
function Content({ index, date, title, children }) {
  const { activeContent, handleToggleContent } = useContext(AccordionContext)
  const active = activeContent === index

  return (
    <div className={twJoin('accordion', active && 'active')}>
      <div className="accordion__title" onClick={() => handleToggleContent(index)}>
        {date && <div className="date">Ngày {date}</div>}
        <h3>{title}</h3>
      </div>
      {active && <div className="content mt-[0.125rem] !block" dangerouslySetInnerHTML={{ __html: children }} />}
    </div>
  )
}

// 4. Add child components as properties to parent component
Accordion.Content = Content
