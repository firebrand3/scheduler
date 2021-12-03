import React from "react";

import "components/InterviewerListItem.scss";

import classNames from "classnames";

//**************************Receives prorps from InterviewList component and renders selected interviewer
export default function InterviewerListItem(props) {
  let interviewerClass = classNames({
    interviewers__item: true,
    "interviewers__item--selected": props.selected,
  });

  return (
    <>
      <li className={interviewerClass} onClick={props.setInterviewer}>
        <img
          className="interviewers__item-image"
          src={props.avatar}
          alt={props.name}
        />
        {props.selected && props.name}
      </li>
    </>
  );
}
