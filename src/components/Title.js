import React from "react";

const Title = (props) => (
  <div className={`page-title ${props.myClass}`}>
    <h1>
      <span className="light">{props.text}</span> {props.bold}{" "}
      {props.idquote ? props.idquote : ""}
    </h1>
  </div>
);

export default Title;
