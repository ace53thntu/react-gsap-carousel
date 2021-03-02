import React from "react";
import "./styles.scss";

const Card = ({ name, parentWidth, width, height, handleNext, handlePrev }) => {
  return (
    <div
      className={`item`}
      style={{
        width,
        height: height + 100,
      }}
    >
      <p className={`card-text`}>{name}</p>
      <div
        className={"card"}
        style={{
          width,
          height,
        }}
      ></div>
    </div>
  );
};

export default Card;
