import React from "react";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

//**************************Application component; passes props to Appointment and DayList components
//**************************uses custom hooks for data management
export default function Application() {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  //**************************just for reference
  // const setDays = days => setState({ ...state, days });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  // const setDays = days => setState(Object.assign({}, state, {days}));
  // const setDays = days => setState(prev => (Object.assign({}, prev, {days})));
  //**************************

  const arrayOfAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        {...appointment}
        key={appointment.id}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
          <DayList days={state.days} value={state.day} onChange={setDay} />
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
