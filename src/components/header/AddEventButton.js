import HeadButton from "./HeadButton"

function AddEventButton(props) {

  const createEventHandler = () => {
    let defaultTxt = ''
    if (props.activeEvent) {
      let { year, month, date, hour } = props.activeEvent
      defaultTxt = year + '-' + (month + 1) + '-' + date
        + ' ' + hour + ':00'
    }

    const title = 'Enter event time: YYYY-MM-DD HH:mm'
    const promptRes = prompt(title, defaultTxt)

    if (!promptRes) return
    const enteredDate = new Date(promptRes)
    if (enteredDate instanceof Date && !isNaN(enteredDate)) { } else { return }

    const year = enteredDate.getFullYear()
    const month = enteredDate.getMonth()
    const date = enteredDate.getDate()
    const hour = enteredDate.getHours()
    props.createEventHandler({ year, month, date, hour })
  }

  return (
    <HeadButton onClick={createEventHandler}>+</HeadButton>
  )
}

export default AddEventButton