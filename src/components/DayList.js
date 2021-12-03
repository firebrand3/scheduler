import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {
  const listOfDays = props.days.map((day) => {
    return (
      <DayListItem
        {...day}
        key={day.id}
        selected={day.name === props.value}
        setDay={() => props.onChange(day.name)}
      />
    );
  });

  return <ul>{listOfDays}</ul>;
}
