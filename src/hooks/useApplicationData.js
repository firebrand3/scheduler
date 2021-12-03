import axios from "axios";
import { useState, useEffect } from "react";

//************************************************************Custom Hook function to seperate concerns; manage API calls to fetch,
//************************************************************edit and delete appointment data
export default function useApplicationData() {
  //**********set initial state
  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //**********function to setDay when user clicks a specific day
  const setDay = (day) => setState({ ...state, day });

  //**********useEffect hook make api call to fetch data and set state based on response
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

  //**********function to book interview by making api edit call and update spots
  function bookInterview(id, interview) {
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

  //**********function to cancel interview by making api delete call and update spots
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
