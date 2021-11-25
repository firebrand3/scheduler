export function getAppointmentsForDay(state, day) {
  // console.log("STATE!!", state)
  const appointmentsForDay = [];
  
  if(!state.days.length) {
    return [];
  } 
  
  const filteredDays = state.days.filter(stateDay => stateDay.name === day);
  
  // console.log("RESULT!!", filteredDays[0].appointments);

  if(!filteredDays.length){
    return [];
  }

  const appoitmentArray = filteredDays[0].appointments;

  for (const appointment of appoitmentArray) {
    if(state.appointments[appointment]) {
      appointmentsForDay.push(state.appointments[appointment])
      // console.log("*****", appointmentsForDay)
    }

  }

  return appointmentsForDay;
}