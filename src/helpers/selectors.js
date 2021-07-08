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
