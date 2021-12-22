import React from "react";
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  // list all the mode constants
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  // import mode, transition and back function
  // set initial mode to SHOW or EMPTY
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // function called when clicking on "save"
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    // async process for saving data
    transition(SAVING);
    props
      .bookInterview(props.id, interview) // save data to server
      .then(() => transition(SHOW)) // transit to SHOW mode to show the appointment
      .catch(error => transition(ERROR_SAVE, true));
  }

  // function called when clicking on "delete"
  const confirmDelete = () => {
    transition(CONFIRM);
  }
  
  // function called when confirmed to delete
  const del = () => {
    // async process for deleting data
    transition(DELETING, true);
    props
      .cancelInterview(props.id) // delete data from server
      .then(() => transition(EMPTY)) // transit to EMPTY mode
      .catch(error => transition(ERROR_DELETE, true));
  }

  // function called when clicking on edit button
  const edit = () => {
    transition(EDIT);
  }
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && 
        <Show 
          {...props.interview} 
          onEdit={edit}
          onDelete={confirmDelete}
        />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}
      {mode === CONFIRM && (
        <Confirm 
          onCancel={() => back()}
          onConfirm={del}
        />
      )}
      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}
      {mode === EDIT && (
        <Form 
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message="Could not save appointment"
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message="Could not delete appointment"
          onClose={() => back()}
        />
      )}
    </article>
  );
}
