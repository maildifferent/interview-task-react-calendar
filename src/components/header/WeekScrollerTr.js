import styled from 'styled-components'
import { getDates } from '../../utilities/getDates'
import HeadButton from './HeadButton'

const ARROW_LEFT = '<'
const ARROW_RIGHT = '>'

const MONTHES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const WeekScrollerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(235, 235, 235);
`

function WeekScrollerTr(props) {

  const shiftLeftHandler = () => {
    const {year, month, date} = props.firstDate
    const firstDate = new Date(year, month, date - 7)
    const datesArr = getDates(firstDate, 7)
    props.setDatesArrHandler(datesArr)
  }

  const shiftRightHandler = () => {
    const {year, month, date} = props.lastDate
    const firstDate = new Date(year, month, date + 1)
    const datesArr = getDates(firstDate, 7)
    props.setDatesArrHandler(datesArr)
  }

  return (
    <tr>
      <td></td>
      <td colSpan={7}>
        <WeekScrollerDiv>
          <HeadButton onClick={shiftLeftHandler}>{ARROW_LEFT}</HeadButton>
          <div>{MONTHES[props.lastDate.month] + ' ' + props.lastDate.year}</div>
          <HeadButton onClick={shiftRightHandler}>{ARROW_RIGHT}</HeadButton>
        </WeekScrollerDiv>
      </td>
    </tr>
  )
}

export default WeekScrollerTr