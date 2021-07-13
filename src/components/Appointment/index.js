import React, { useEffect } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import axios from "axios";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onAdd() {
    transition(CREATE);
  }

  function edit() {
    transition(EDIT);
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition("SHOW");
      })
      .catch((error) => transition(ERROR_SAVE, true));
    /*
    axios
      .put(`/api/appointments/${props.id}`, {
        interview,
      })
      .then((response) => {
        props.bookInterview(props.id, interview);
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
   */
  }
  function deleteInterview(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    if (mode === CONFIRM) {
      transition(DELETING, true);
      props
        .cancelInterview(props.id, interview)
        .then(() => {
          transition(EMPTY);
        })
        .catch((error) => transition(ERROR_DELETE, true));
      /*
      axios
        .delete(`/api/appointments/${props.id}`, {
          interview,
        })
        //.cancelInterview(props.id, interview)
        .then((response) => {
          props.cancelInterview(props.id, interview);
          transition(EMPTY);
        })
        .catch((error) => transition(ERROR_DELETE, true));
        */
    } else {
      transition(CONFIRM);
    }
  }
  return (
    <article className="appointment">
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={edit}
          onDelete={deleteInterview}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers} //interviewers
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to cancel this appointment?"
          onCancel={back}
          onConfirm={deleteInterview}
        />
      )}
      {mode === EDIT && (
        <Form
          onSave={save}
          onCancel={back}
          interviewers={props.interviewers}
          name={props.interview.student}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Error in saving" onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Error in deleting" onClose={back} />
      )}
    </article>
  );
}
