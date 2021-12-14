import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const EMPTY_FORM = "EMPTY_FORM"; //add a new error mode to prevent saving empty appoitments

//**************************Appointment component; receives props from Application component
//**************************uses custom hook to set modes and pass props to other components to render appointments
export default function Appointment(props) {
  function save(name, interviewer) {
    if (name === "" || !interviewer) {
      transition(EMPTY_FORM, true);
      return;
    }
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      //Optimistic vs Pessimistic - M7W19 Creating Appointments; got error or UI was stuck after creating appointment;
      //.then allows to wait for bookInterview to return before proceeding to transition(SHOW)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => transition(ERROR_SAVE, true));
  }

  function interviewdelete() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => transition(ERROR_DELETE, true));
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          // onSubmit={(event) => event.preventDefault()}
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={mode} />}
      {mode === DELETING && <Status message={mode} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={() => back(SHOW)}
          onConfirm={interviewdelete}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Could not save appointment"} onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Could not delete appointment"}
          onClose={() => back()}
        />
      )}
      {mode === EMPTY_FORM && (
        <Error
          message={"Student name is blank or interviewer is not selected"}
          onClose={() => back()}
        />
      )}
    </article>
  );
}
