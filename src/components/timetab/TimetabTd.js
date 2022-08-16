import styled from 'styled-components'

const TimetabCellDiv = styled.div`
  height: 4rem;
  border: 1px solid white;
  cursor: pointer;
`

const StyledTd = styled.td`
  border-top: 1px solid rgb(235, 235, 235);
  border-right: 1px solid rgb(235, 235, 235);
`

const TCellEmpty = styled.div`background-color: white;`
const TCellEmptyActive = styled.div`background-color: rgb(192, 192, 192);`
const TCellOccupied = styled.div`background-color: rgb(235, 236, 255);`
const TCellOccupiedActive = styled.div`background-color: rgb(179, 183, 255);`

function TimetabTd(props) {
  const active = props.timecellEvent.active
  const occupied = props.timecellEvent.occupied
  let TCellWrap
  if (!occupied && !active) { TCellWrap = TCellEmpty }
  else if (!occupied && active) { TCellWrap = TCellEmptyActive }
  else if (occupied && !active) { TCellWrap = TCellOccupied }
  else if (occupied && active) { TCellWrap = TCellOccupiedActive }

  return (
    <StyledTd><TCellWrap><TimetabCellDiv
      onClick={() => {
        props.activeChangeHandler(props.timecellEvent)
      }}
    ></TimetabCellDiv></TCellWrap></StyledTd>
  )
}

export default TimetabTd