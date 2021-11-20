import React, { useState } from "react";

import "components/InterviewerListItem.scss";

import classNames from "classnames";

export default function InterviewerListItem(props) {
  // const [interviewer, setInterviever] = useState();

  let interviewerClass = classNames({
    interviewers__item: true,
    "interviewers__item--selected": props.selected,
  });

  return (
    <>
      <li
        className={interviewerClass}
        onClick={props.setInterviewer}
        // selected={props.selected}
      >
        <img
          className="interviewers__item-image"
          src={props.avatar}
          alt={props.name}
        />
        {/* {props.selected && <h3 className={interviewerClass}>{props.name}</h3>} */}
        {props.selected && props.name}
      </li>
    </>
  );
}
