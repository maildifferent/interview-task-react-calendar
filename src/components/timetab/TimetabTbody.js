import styled from 'styled-components'
import { isEventsKeysEqual } from '../../utilities/isEventsKeysEqual'
import { stringFromEventKey } from '../../utilities/stringFromEventKey'
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
  return (
    <tr key={hour}>
      <LeftTextTd>{('0' + hour).slice(-2) + ':00'}</LeftTextTd>

      {weekDaysArr.map((yeMoDa) => {
        const currEvent = { ...yeMoDa, hour, active: false, occupied: false }

        if (
          activeEvent && isEventsKeysEqual(currEvent, activeEvent)
        ) currEvent.active = true

        for (let i = 0; i < eventsArr.length; i++) {
          const event = eventsArr[i]
          if (isEventsKeysEqual(currEvent, event)) {
            currEvent.occupied = true
            break
          }
        }

        return (<TimetabTd
          key={stringFromEventKey(currEvent)}
          timecellEvent={currEvent}
          activeChangeHandler={activeEventChangeHandler}
        />)
      })}
    </tr>
  )
}