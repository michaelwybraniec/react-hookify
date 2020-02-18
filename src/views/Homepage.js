import React from "react";
import Container from "@material-ui/core/Container";
import Header from "./components/header/header.js";
import Footer from "./components/footer/footer.js";
import Countries from "./Countries.js";

class Homepage extends React.Component {
  state = { width: 0, height: 0 };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const mdWidth = 768;
    return (
      <React.Fragment>
        <Container
          fixed
          style={{
            backgroundColor: "#F5F5F5"
          }}>
          <Header isMobileSized={this.state.width < mdWidth} />
          <Countries isMobileSized={this.state.width < mdWidth} />
          <Footer />
        </Container>
      </React.Fragment>
    );
  }
}

export default Homepage;
