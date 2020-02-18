import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Header from "./components/header/header.js";
import Footer from "./components/footer/footer.js";
import Countries from "./Countries.js";

function Homepage() {
  const mdWidth = 768;
  const [width, setWidth] = useState(0);

  function updateWindowDimensions() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);

    // returned function will be called on component unmount
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  return (
    <React.Fragment>
      <Container
        style={{
          backgroundColor: "#F5F5F5"
        }}>
        <Header isMobileSized={width < mdWidth} />
        <Countries isMobileSized={width < mdWidth} />
        <Footer />
      </Container>
    </React.Fragment>
  );
}

export default Homepage;
