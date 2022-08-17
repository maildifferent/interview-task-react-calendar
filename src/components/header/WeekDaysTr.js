import styled from 'styled-components'
import { stringFromEventKey } from '../../utilities/stringFromEventKey'

const WeekDaysTd = styled.td`
  border-top: 1px solid rgb(235, 235, 235);
`

function WeekDaysTr(props) {
  const weekDaysArr = setWeekDaysForDates(props.datesArr)
  return (
    <tr>
      <WeekDaysTd></WeekDaysTd>
      {
        weekDaysArr.map((weekDay) => {
          return (<WeekDaysTd key={stringFromEventKey(weekDay)}>
            {weekDay.weekDay}
          </WeekDaysTd>)
        })
      }
    </tr>
  )
}

export default WeekDaysTr

function setWeekDaysForDates(dates) {
  const weekDays = []
  
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i]
    const dateStamp = new Date(date.year, date.month, date.date)
    const weekDay = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][dateStamp.getDay()]
    weekDays.push({ ...date, weekDay })
  }

  return weekDays
}