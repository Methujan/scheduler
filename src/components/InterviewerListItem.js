import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const classes = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  const imageClass = classNames("interviewers__item-image");
  return (
    <li onClick={props.setInterviewer} className={classes}>
      <img className={imageClass} src={props.avatar} alt={props.name} />
      {props.selected && props.name}
    </li>
  );
}
