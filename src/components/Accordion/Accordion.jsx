export default function Accordion({ date, title, children, active, onClick }) {
  return (
    <div className="accordion" onClick={onClick}>
      <div className="accordion__title">
        {date && <div className="date">Ngày {date}</div>}
        <h3>{title}</h3>
      </div>
      {active && <div className="content mt-[0.125rem] !block" dangerouslySetInnerHTML={{ __html: children }} />}
    </div>
  )
}
