import styled from 'styled-components'
import TimetabTd from "./TimetabTd"

const TimetabFirstTr = styled.tr`
  height: 0.7rem;
`

const LeftTextTd = styled.td`
  text-align: center;
  border: none;
  color: rgb(192, 192, 192);
  position: relative;
  top: -2rem;
  z-index: -1;
`

function TimetabTbody(props) {

  const rows = []
  for (let hour = 0; hour < 24; hour++) {
    const row = renderRow(
      hour,
      props.weekDaysArr,
      props.eventsArr,
      props.activeEvent,
      props.activeEventChangeHandler
    )
    rows.push(row)
  }

  return (
    <tbody className='timetable'>
      <TimetabFirstTr />
      {rows}
    </tbody>
  )
}

export default TimetabTbody

function renderRow(
  hour,
  weekDaysArr,
  eventsArr,
  activeEvent,
  activeEventChangeHandler
) {
  const key = ('0' + hour).slice(-2)
  return (
    <tr key={key}>
      <LeftTextTd>{('0' + hour).slice(-2) + ':00'}</LeftTextTd>

      {weekDaysArr.map((yeMoDa) => {
        const { year, month, date } = yeMoDa
        const currEvent = {...yeMoDa, hour, active: false, occupied: false}

        const key = year + ('0' + month).slice(-2)
          + ('0' + date).slice(-2) + ('0' + hour).slice(-2)

        if (activeEvent
          && activeEvent.year === year
          && activeEvent.month === month
          && activeEvent.date === date
          && activeEvent.hour === hour
        ) currEvent.active = true

        for (let i = 0; i < eventsArr.length; i++) {
          const event = eventsArr[i]
          if (event.year !== year) continue
          if (event.month !== month) continue
          if (event.date !== date) continue
          if (event.hour !== hour) continue
          currEvent.occupied = true
          break
        }

        return (<TimetabTd
          key={key}
          timecellEvent={currEvent}
          activeChangeHandler={activeEventChangeHandler}
        />)
      })}
    </tr>
  )
}