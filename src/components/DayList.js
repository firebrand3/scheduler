import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {
  
  const listOfDays = props.days.map(nowday => {
    return <DayListItem
        {...nowday}
        key={nowday.id}
        // name={nowday.name} 
        // spots={nowday.spots} 
        selected={nowday.name === props.day}
        setDay={props.setDay}  
    />})

  return (
  <ul>
  {listOfDays}
  </ul>
  );
}

