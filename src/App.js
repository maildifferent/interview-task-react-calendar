import { useState } from 'react';
import styled from 'styled-components'
import './App.css';
import FootButton from './components/footer/FootButton';
import AddEventButton from './components/header/AddEventButton';
import WeekDatesTr from './components/header/WeekDatesTr';
import WeekDaysTr from './components/header/WeekDaysTr';
import WeekScrollerTr from './components/header/WeekScrollerTr';
import TimetabTbody from './components/timetab/TimetabTbody';
import { getDates } from './utilities/getDates';

////////////////////////////////////////////////////////////////////////////////
// Init.
////////////////////////////////////////////////////////////////////////////////
const DUMMY_EVENTS_ARR = (() => {
  const firstDate = new Date()
  firstDate.setDate(firstDate.getDate() - 20)

  const eventsArr = getDates(firstDate, 40)
  for (let i = 0; i < eventsArr.length; i++) {
    eventsArr[i].hour = 6
  }

  return eventsArr
})()

let initDatesArr = getDatesOfCurrentWeek()

////////////////////////////////////////////////////////////////////////////////
// Elements.
////////////////////////////////////////////////////////////////////////////////
const CalendarDiv = styled.div`
  width: 740px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 740px) {
    width: 100%;
  }
`

const CalendarHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: white;
  height: 5rem;
`

const CalendarHeaderTextDiv = styled.div`
  font-size: 2rem;
  padding-left: 2rem;
`

const CalendarThead = styled.thead`
  position: sticky;
  top: 5rem;
  background-color: rgb(246, 246, 246);
  text-align: center;
  vertical-align: middle;
`

const CalendarTable = styled.table`
  width: 100%;
`

const CalendarFooterDiv = styled.div`
  position: sticky;
  bottom: 0;
  background-color: rgb(246, 246, 246);
  border-top: 1px solid rgb(235, 235, 235);
  display: flex;
  justify-content: space-between;
`

////////////////////////////////////////////////////////////////////////////////
// App.
////////////////////////////////////////////////////////////////////////////////
function App() {
  const [activeEvent, setActiveEvent] = useState()

  const setAciveEventHandler = (event) => {
    setActiveEvent(event)
  }

  const [weekDaysArr, setWeekDaysArr] = useState(getWeekDaysForDates(initDatesArr))

  const setWeekDaysArrHandler = (datesArr) => {
    const newWeekDaysArr = getWeekDaysForDates(datesArr)
    setWeekDaysArr(newWeekDaysArr)
    const relevantEvents = getEventsForDates(datesArr)
    setEventsArr(relevantEvents)
  }

  const [eventsArr, setEventsArr] = useState(getEventsForDates(weekDaysArr))

  const createEventHandler = (newEvent) => {
    if (!createEvent(newEvent)) return
    const relevantEvents = getEventsForDates(weekDaysArr)
    setEventsArr(relevantEvents)
  }

  const deleteEventHandler = (delEvent) => {
    if (!deleteEvent(delEvent)) return
    const relevantEvents = getEventsForDates(weekDaysArr)
    setEventsArr(relevantEvents)
  }

  const todayEventHandler = () => {
    setWeekDaysArrHandler(getDatesOfCurrentWeek())
  }

  return (
    <CalendarDiv>
      <CalendarHeaderDiv>
        <CalendarHeaderTextDiv>Interview Calendar</CalendarHeaderTextDiv>
        <AddEventButton
          createEventHandler={createEventHandler}
          activeEvent={activeEvent}
        />
      </CalendarHeaderDiv>
      <CalendarTable>
        <CalendarThead>
          <WeekDaysTr weekDaysArr={weekDaysArr} />
          <WeekDatesTr weekDaysArr={weekDaysArr} />
          <WeekScrollerTr
            firstDay={weekDaysArr[0]}
            lastDay={weekDaysArr[weekDaysArr.length - 1]}
            setWeekDaysArrHandler={setWeekDaysArrHandler}
          />
        </CalendarThead>
        <TimetabTbody
          weekDaysArr={weekDaysArr}
          eventsArr={eventsArr}
          activeEvent={activeEvent}
          activeEventChangeHandler={setAciveEventHandler}
        />
      </CalendarTable>
      <CalendarFooterDiv>
        <FootButton
          onClick={todayEventHandler}
        >Today</FootButton>
        <FootButton
          hidden={!activeEvent || !activeEvent.occupied}
          onClick={() => { deleteEventHandler(activeEvent) }}
        >Delete</FootButton>
      </CalendarFooterDiv>
    </CalendarDiv>
  )
}

export default App

////////////////////////////////////////////////////////////////////////////////
// Auxilary functions.
////////////////////////////////////////////////////////////////////////////////
function createEvent(newEvent) {
  const { year, month, date, hour } = newEvent
  const findRes = DUMMY_EVENTS_ARR.find((savedEvent) => {
    return savedEvent.year === year && savedEvent.month === month
      && savedEvent.date === date && savedEvent.hour === hour
  })
  if (findRes) return false
  DUMMY_EVENTS_ARR.push({ year, month, date, hour })
  return true
}

function deleteEvent(delEvent) {
  const { year, month, date, hour } = delEvent
  const eventIndex = DUMMY_EVENTS_ARR.findIndex((savedEvent) => {
    return savedEvent.year === year && savedEvent.month === month
      && savedEvent.date === date && savedEvent.hour === hour
  })
  if (!(eventIndex >= 0)) return false
  DUMMY_EVENTS_ARR.splice(eventIndex, 1)
  return true
}

function getDatesOfCurrentWeek() {
  const today = new Date()
  const usWeekDay = today.getDay()
  const ruWeekDay = usWeekDay === 0 ? 6 : usWeekDay - 1
  const firstDate = new Date(today)
  firstDate.setDate(firstDate.getDate() - ruWeekDay)

  const datesArr = getDates(firstDate, 7)
  return datesArr
}

function getWeekDaysForDates(dates) {
  const todayDate = new Date()
  const year = todayDate.getFullYear()
  const month = todayDate.getMonth()
  const date = todayDate.getDate()
  const today = { year, month, date }

  const weekDays = []
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i]
    const dateStamp = new Date(date.year, date.month, date.date)
    const weekDay = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][dateStamp.getDay()]
    let redDotFlag = false
    if (
      date.year === today.year
      && date.month === today.month
      && date.date === today.date
    ) redDotFlag = true
    weekDays.push({ ...date, weekDay, redDotFlag })
  }

  return weekDays
}

function getEventsForDates(dates) {
  const events = []
  for (let i = 0; i < DUMMY_EVENTS_ARR.length; i++) {
    const event = DUMMY_EVENTS_ARR[i]
    for (let j = 0; j < dates.length; j++) {
      const { year, month, date } = dates[j]
      if (event.year !== year) continue
      if (event.month !== month) continue
      if (event.date !== date) continue
      events.push(event)
    }
  }
  return events
}
