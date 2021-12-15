import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";

import "components/Application.scss";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({...state, day});
  const setDays = (days) => {
    setState(prev => ({ ...prev, days }));
  };
  const setAppointments = (appointments) => {
    setState(prev => ({ ...prev, appointments }));
  };
  const setInterviewers = (interviewers) => {
    setState(prev => ({ ...prev, interviewers }));
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // console.log(all);
      setDays([...all[0].data]);
      setAppointments(all[1].data);
      setInterviewers(all[2].data);
    })
  }, [state.day])

  // console.log(state.interviewers)
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  // console.log(dailyAppointments)
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  // console.log(dailyInterviewers)

  const bookInterview = (id, interview) => {
    console.log(id, interview);
    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };
    console.log(appointments)
    setState({...state, appointments})
    
    // axios
    //   .put(`/api/appointments/${id}`, appointments)
    //   .then(() => {
    //     console.log(appointments);
    //   })
    //   .catch(err => console.log(err.message))
  } 

  const cancelInterview = (id) => {
    const appointments = { ...state.appointments[id], interview: null }

    // axios
    //   .delete(`/api/appointments/${id}`)
    //   .then(() => console.log(`delete at ${id}`))
  }

  const appointmentList = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
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
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { appointmentList }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
