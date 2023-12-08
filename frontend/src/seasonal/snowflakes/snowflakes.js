import React from "react";
import "./snowflakes.css";

const Snowflakes = ({ showSnowflakes }) => {
  if (showSnowflakes) {
    return (<>
      <div class="snowflakes" aria-hidden="true">
      <div class="snowflake">
        <div class="inner">❅</div>
      </div>
      <div class="snowflake">
        <div class="inner">❅</div>
      </div>
      <div class="snowflake">
        <div class="inner">❅</div>
      </div>
      <div class="snowflake">
        <div class="inner">❅</div>
      </div>
      <div class="snowflake">
        <div class="inner">❅</div>
      </div>
      <div class="snowflake">
        <div class="inner">❅</div>
      </div>
      <div class="snowflake">
        <div class="inner">❅</div>
      </div>
      <div class="snowflake">
        <div class="inner">❅</div>
      </div>
      <div class="snowflake">
        <div class="inner">❅</div>
      </div>
      <div class="snowflake">
        <div class="inner">❅</div>
      </div>
      <div class="snowflake">
        <div class="inner">❅</div>
      </div>
      <div class="snowflake">
        <div class="inner">❅</div>
      </div>
    </div>
    </>);
  };

  return <></>;
};

export default Snowflakes;