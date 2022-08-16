import styled from 'styled-components'

const DotSpan = styled.span`
  text-align: center;
  vertical-align: middle;
  height: 2rem;
  width: 2rem;
  line-height: 2rem;
  background-color: red;
  border-radius: 50%;
  display: inline-block;
  color: white;
`

const WeekDatesTd = styled.td`
  height: 2rem;
  width: 2rem;
  font-weight: bold;
`

function WeekDatesTr(props) {
  return (
    <tr>
      <WeekDatesTd></WeekDatesTd>
      {
        props.weekDaysArr.map((weekDay) => {
          const { year, month, date } = weekDay
          const key = year + ('0' + month).slice(-2) + ('0' + date).slice(-2)
          
          if (weekDay.redDotFlag) {
            return (<WeekDatesTd key={key}>
              <DotSpan>{weekDay.date}</DotSpan>
            </WeekDatesTd>)
          } else {
            return (<WeekDatesTd key={key}>{weekDay.date}</WeekDatesTd>)
          }
        })
      }
    </tr>
  )
}

export default WeekDatesTr