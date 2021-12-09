import React from "react";
import DayListItem from "./DayListItem";

export default function(props) {
  const parsedDayList = props.days.map(day => <DayListItem key={day.id} {...day} />)

  return (
    <ul>
      { parsedDayList }
    </ul>
  );
}