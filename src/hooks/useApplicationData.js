import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "",
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

  function bookInterview(id, interview) {
    console.log(state.days);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map((theDay) => {
      if (theDay.name === state.day) {
        return { ...theDay, spots: theDay.spots - 1 };
      } else {
        return theDay;
      }
    });

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map((theDay) => {
      if (theDay.name === state.day) {
        return { ...theDay, spots: theDay.spots + 1 };
      } else {
        return theDay;
      }
    });

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}