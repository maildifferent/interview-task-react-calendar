import { useState } from 'react';
import styled from 'styled-components'
import './App.css';
import FootButton from './components/footer/FootButton';
import AddEventButton from './components/header/AddEventButton';
import HeadDatesTr from './components/header/HeadDatesTr';
import WeekDaysTr from './components/header/WeekDaysTr';
import WeekScrollerTr from './components/header/WeekScrollerTr';
import TimetabTbody from './components/timetab/TimetabTbody';
import { getDates } from './utilities/getDates';
import { isEventsKeysEqual } from './utilities/isEventsKeysEqual';

////////////////////////////////////////////////////////////////////////////////
// Init.
////////////////////////////////////////////////////////////////////////////////
const dummyEventsArr = (() => {
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

  const setActiveEventHandler = (event) => {
    setActiveEvent(event)
  }

  const [datesArr, setDatesArr] = useState(initDatesArr)

  const setDatesArrHandler = (datesArr) => {
    setDatesArr(datesArr)
    const relevantEvents = getEventsForDates(datesArr)
    setEventsArr(relevantEvents)
  }

  const [eventsArr, setEventsArr] = useState(getEventsForDates(datesArr))

  const createEventHandler = (newEvent) => {
    if (!createEvent(newEvent)) return
    const relevantEvents = getEventsForDates(datesArr)
    setEventsArr(relevantEvents)
  }

  const deleteEventHandler = (delEvent) => {
    if (!deleteEvent(delEvent)) return
    const relevantEvents = getEventsForDates(datesArr)
    setEventsArr(relevantEvents)
  }

  const todayEventHandler = () => {
    setDatesArrHandler(getDatesOfCurrentWeek())
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
          <WeekDaysTr datesArr={datesArr} />
          <HeadDatesTr datesArr={datesArr} />
          <WeekScrollerTr
            firstDate={datesArr[0]}
            lastDate={datesArr[datesArr.length - 1]}
            setDatesArrHandler={setDatesArrHandler}
          />
        </CalendarThead>
        <TimetabTbody
          weekDaysArr={datesArr}
          eventsArr={eventsArr}
          activeEvent={activeEvent}
          activeEventChangeHandler={setActiveEventHandler}
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
  const findRes = dummyEventsArr.find(
    (savedEvent) => isEventsKeysEqual(savedEvent, newEvent)
  )
  if (findRes) return false
  dummyEventsArr.push(newEvent)
  return true
}

function deleteEvent(delEvent) {
  const eventIndex = dummyEventsArr.findIndex(
    (savedEvent) => isEventsKeysEqual(savedEvent, delEvent)
  )
  if (!(eventIndex >= 0)) return false
  dummyEventsArr.splice(eventIndex, 1)
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

function getEventsForDates(dates) {
  const events = []
  for (let i = 0; i < dummyEventsArr.length; i++) {
    const event = dummyEventsArr[i]
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
