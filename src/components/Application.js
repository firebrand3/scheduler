import React, {useEffect, useState} from "react";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";

const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};

export default function Application(props) {

  // const [day, setDay] = useState("");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "",
    days: [],
    appointment: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState({ ...state, days });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  // const setDays = days => setState(Object.assign({}, state, {days}));
  const setDays = days => setState(prev => (Object.assign({}, prev, {days})));


  useEffect(() => {
    axios.get("/api/days")
      .then(res => {
        setDays(res.data)
      })
}, [])


  const arrayOfAppointments = Object.values(appointments).map((appointment) => {
    return (
    <Appointment
    {...appointment}
    key={appointment.id}
    />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
          days = {state.days}
          value = {state.day}
          onChange = {setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {arrayOfAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
