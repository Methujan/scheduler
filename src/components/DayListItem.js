import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const classes = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  function formatSpots(props) {
    let message = "";
    if (props.spots === 0) {
      return (message = "no spots remaining");
    } else if (props.spots === 1) {
      return (message = `${props.spots} spot remaining`);
    } else {
      return (message = `${props.spots} spots remaining`);
    }
  }

  return (
    <li onClick={() => props.setDay(props.name)} className={classes}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}
