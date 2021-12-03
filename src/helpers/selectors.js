//**********Helper function that returns and array of appointments for each day
export function getAppointmentsForDay(state, day) {
  const appointmentsForDay = [];

  if (!state.days.length) {
    return [];
  }

  const filteredDays = state.days.filter((stateDay) => stateDay.name === day);
  if (!filteredDays.length) {
    return [];
  }

  const appoitmentArray = filteredDays[0].appointments;

  for (const appointment of appoitmentArray) {
    if (state.appointments[appointment]) {
      appointmentsForDay.push(state.appointments[appointment]);
    }
  }

  return appointmentsForDay;
}

//**********Helper function that returns student and interviewer for a given appointment
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: { ...state.interviewers[interview.interviewer] },
  };
}

//**********Helper function that returns an array of interviewers on a given day
export function getInterviewersForDay(state, day) {
  const interviewersForDay = [];

  if (!state.days.length) {
    return [];
  }

  const filteredDays = state.days.filter((stateDay) => stateDay.name === day);

  if (!filteredDays.length) {
    return [];
  }

  const interviewerArray = filteredDays[0].interviewers;

  for (const interviewer of interviewerArray) {
    if (state.interviewers[interviewer]) {
      interviewersForDay.push(state.interviewers[interviewer]);
    }
  }

  return interviewersForDay;
}
