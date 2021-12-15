import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

const { useState, useEffect } = require("react");

export default function useApplicationData() {
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
  
  const bookInterview = (id, interview) => {
    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };
    setState({...state, appointments})
    
    // axios
    //   .put(`/api/appointments/${id}`, appointments)
    //   .then(() => {
    //     setState({ ...state, appointments });
    //   })
  } 

  const cancelInterview = (id) => {
    const appointment = { ...state.appointments[id], interview: null }
    const appointments = { ...state.appointments, [id]: appointment }
    setState({ ...state, appointments })

    // axios
    //   .delete(`/api/appointments/${id}`)
    //   .then(() => {
    //     setState({ ...state, appointments });
    //   })
  }

  const updateSpots = () => {
    for (const dayObj of state.days) {
      const dailyInterviews = getAppointmentsForDay(state, dayObj.name)
      let updatedSpots = 0
      for (const appointment of dailyInterviews) {
        if (!appointment.interview) {
          updatedSpots += 1;
        }
      }
      dayObj.spots = updatedSpots;
    }
  }

  return { state, setDay, bookInterview, cancelInterview, updateSpots }
}