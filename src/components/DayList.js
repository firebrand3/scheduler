import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {
  const listOfDays = props.days.map(nowday => {
    return <DayListItem
        {...nowday}
        key={nowday.id}
        selected={nowday.name === props.value}
        setDay={() => props.onChange(props.name)}
    />})

  return (
  <ul>
  {listOfDays}
  </ul>
  );
}

