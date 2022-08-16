export function getDates(firstDate, plusDays) {
  const datesArr = [];
  for (let i = 0; i < plusDays; i++) {
    const currentDate = new Date(firstDate);
    currentDate.setDate(firstDate.getDate() + i);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = currentDate.getDate();
    datesArr.push({ year, month, date });
  }

  return datesArr;
}
