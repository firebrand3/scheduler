import React from "react";
import PropTypes from "prop-types";

import "components/InterviewerList.scss";

import InterviewerListItem from "./InterviewerListItem";

InterviewList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default function InterviewList(props) {
  const listOfInterviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        {...interviewer}
        key={interviewer.id}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });

  return (
    <>
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">{listOfInterviewers}</ul>
      </section>
    </>
  );
}
