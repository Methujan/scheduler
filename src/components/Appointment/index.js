import React, { useEffect } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import axios from "axios";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onAdd() {
    transition(CREATE);
  }
  function onCancel() {
    back();
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition("SAVING");

    axios
      .put(`/api/appointments/${props.id}`, {
        interview,
      })
      .then((response) => {
        props.bookInterview(props.id, interview);
        transition(SHOW);
      });
    //props.bookInterview(props.id, interview);
    //transition(SHOW);
  }
  function deleteInterview(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(DELETING);

    axios
      .delete(`/api/appointments/${props.id}`, {
        interview,
      })
      .then((response) => {
        props.cancelInterview(props.id, interview);
        transition(EMPTY);
      });
  }
  return (
    <article className="appointment">
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          //onEdit={onEdit}
          onDelete={deleteInterview}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers} //interviewers
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
    </article>
  );
}
