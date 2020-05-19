import React from "react";
import { Link } from "gatsby";
import Container from "./container";

const Establishment = ({ title }) => {
  return (
    <Container>
      <Link to="/browse">Go back</Link>
      <h1>{title}</h1>
    </Container>
  );
};

export default Establishment;
