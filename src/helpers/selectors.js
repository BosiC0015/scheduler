export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const result = [];
  state.days.forEach(elm => {
    if (elm.name === day) {
      for (const key of elm.appointments) {
        if (Object.keys(state.appointments).includes(key.toString())) {
          result.push(state.appointments[key])
        }
      }
    }
  })
  return result;
}

export function getInterview(state, interview) {
  const result = {};
  const interviewerIDs = Object.keys(state.interviewers)
  if (interview === null) {
    return null;
  }
  // console.log(interview)
  result.student = interview.student;
  result.interviewer = {}
  interviewerIDs.forEach(elm => {
    if (elm === interview.interviewer.toString()) {
      result.interviewer = state.interviewers[elm]
      return result
    }
  })
  return result;
}