export function getAppointmentsForDay(state, day) {
  const appointmentsForDay = [];
  state.days.forEach((dayObj) => {
    if (dayObj.name === day) {
      dayObj.appointments.forEach((appointmentID) => {
        appointmentsForDay.push(state.appointments[appointmentID]);
      });
    }
  });
  return appointmentsForDay;
}
export function getInterviewersForDay(state, day) {
  const interviewersForDay = [];
  state.days.forEach((dayObj) => {
    if (dayObj.name === day) {
      dayObj.interviewers.forEach((interviewerID) => {
        interviewersForDay.push(state.interviewers[interviewerID]);
      });
    }
  });
  return interviewersForDay;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer };
}
