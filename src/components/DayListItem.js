import React from "react";

import "components/DayListItem.scss";

import classNames from "classnames";

export default function DayListItem(props) {
  let dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  const formatSpot = () => {
    if (props.spots === 0) {
      return "no spots remaining";
    }
    if (props.spots === 1) {
      return "1 spot remaining";
    }
    if (props.spots > 1) {
      return `${props.spots} spots remaining`;
    }
  };

  return (
    <>
      <li
        onClick={props.setDay}
        className={dayClass}
        selected={props.selected}
      >
        <h2 className="text--regular">{props.name}</h2>
        <h3 className="text--light">{formatSpot()}</h3>
      </li>
    </>
  );
}
