import React from "react";
import Container from "@material-ui/core/Container";

const Wrapper = props => (
  <section
    className={`wrapper-container ${props.active === true ? "active" : ""}`}
  >
    <Container maxWidth="md">
      <div className="content">{props.children}</div>
    </Container>
  </section>
);

export default Wrapper;
