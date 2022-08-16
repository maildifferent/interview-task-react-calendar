import styled from 'styled-components'

const WeekDaysTd= styled.td`
  border-top: 1px solid rgb(235, 235, 235);
`

function WeekDaysTr(props) {
  return (
    <tr>
      <WeekDaysTd></WeekDaysTd>
      {
        props.weekDaysArr.map((weekDay) => {
          const { year, month, date } = weekDay
          const key = year + ('0' + month).slice(-2) + ('0' + date).slice(-2)
          return (<WeekDaysTd key={key}>{weekDay.weekDay}</WeekDaysTd>)
        })
      }
    </tr>
  )
}

export default WeekDaysTr