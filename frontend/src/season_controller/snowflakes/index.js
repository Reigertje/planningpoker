import React from "react";
import "./snowflakes.css";

const Snowflakes = ({ displayEffects }) => {
  if (displayEffects) {
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
};

export default Snowflakes;