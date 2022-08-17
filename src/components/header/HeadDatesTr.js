import styled from 'styled-components'
import { stringFromEventKey } from '../../utilities/stringFromEventKey'

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

const HeadDatesTd = styled.td`
  height: 2rem;
  width: 2rem;
  font-weight: bold;
`

function HeadDatesTr(props) {
  const datesObjArr = setTodayFlagForDates(props.datesArr)
  return (
    <tr>
      <HeadDatesTd></HeadDatesTd>
      {
        datesObjArr.map((date) => {
          return (
            <HeadDatesTd key={stringFromEventKey(date)}>
              {date.isToday ? <DotSpan>{date.date}</DotSpan> : date.date}
            </HeadDatesTd>
          )
        })
      }
    </tr>
  )
}

export default HeadDatesTr

function setTodayFlagForDates(dates) {
  const todayDate = new Date()
  const year = todayDate.getFullYear()
  const month = todayDate.getMonth()
  const date = todayDate.getDate()
  const today = { year, month, date }

  const datesObjArr = []
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i]
    let isToday = false
    if (
      date.year === today.year
      && date.month === today.month
      && date.date === today.date
    ) isToday = true
    datesObjArr.push({ ...date, isToday })
  }

  return datesObjArr
}