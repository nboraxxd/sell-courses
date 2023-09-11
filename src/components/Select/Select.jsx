import { useEffect, useState } from 'react'

export default function Select({ value, onChange, placeholder, options }) {
  const [isOpen, setIsOpen] = useState(false)
  const [label, setLabel] = useState(() => options.find((option) => option.value === value))

  useEffect(() => {
    function onCloseOptions() {
      setIsOpen(false)
    }
    window.addEventListener('click', onCloseOptions)

    return () => window.removeEventListener('click', onCloseOptions)
  }, [])

  function onOpenOptions(ev) {
    ev.stopPropagation()
    setIsOpen(true)
  }

  function onChangeOption(index) {
    return function () {
      setLabel(options[index].label)
      onChange && onChange({ target: { value: options[index].value } })
    }
  }

  return (
    <div className="select">
      <div className="head" onClick={onOpenOptions}>
        {label || placeholder}
      </div>
      <div className="sub" style={{ display: isOpen ? 'block' : 'none' }}>
        {options.map((option, index) => (
          <div key={option.value} onClick={onChangeOption(index)}>
            {option.label}
          </div>
        ))}
      </div>
    </div>
  )
}
