import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const updateSpots = (incomingState, day) => {
    const state = { ...incomingState };
    const currentDay = day || state.day;

    const currentDayObj = state.days.find(
      (dayObj) => dayObj.name === currentDay
    );
    const currentDayIndex = state.days.findIndex(
      (dayObj) => dayObj.name === currentDay
    );

    const listOfAppointmentIds = currentDayObj.appointments;
    const listOfNullAppointments = listOfAppointmentIds.filter(
      (id) => !state.appointments[id].interview
    );

    const spots = listOfNullAppointments.length;
    const updatedDayObj = { ...currentDayObj, spots };

    state.days = [...state.days];
    state.days[currentDayIndex] = updatedDayObj;

    return state;
  };

  //Books interview and updates the number of spots remaining
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, {
        interview,
      })
      .then(() => {
        setState({
          ...state,
          appointments,
        });
        setState((prevState) => {
          const newState = { ...prevState, appointments };
          const newNewState = updateSpots(newState);
          return newNewState;
        });
      });
  }

  //Cancels interview and updates the number of spots remaining
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
      });
      setState((prevState) => {
        const newState = { ...prevState, appointments };
        const newNewState = updateSpots(newState);
        return newNewState;
      });
    });
  }

  return {
    bookInterview,
    cancelInterview,
    setDay,
    state,
  };
}
