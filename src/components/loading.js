import React from "react";

const Loading = props => (
  <div className="componentloading">
    <div>
      <div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span class="spinner-label">Carregando</span>
    </div>
    {
      props.message && 
    <span class="spinner-label-text">{props.message}</span>

    }
  </div>
);

export default Loading;
