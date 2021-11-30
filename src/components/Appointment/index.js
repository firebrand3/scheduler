import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

export default function Appointment(props) {
  function save(name, interviewer) {
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
      });
  }

  function interviewdelete(id) {
    transition(DELETING);
    props.cancelInterview(id).then(() => {
      transition(EMPTY);
    });
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
          onDelete={() => interviewdelete(props.id)}
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
    </article>
  );
}
