

import React from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h1>Oops! Something went wrong 😢</h1>
          <p>This page is temporarily unavailable.</p>

          <Link to="/" style={styles.button}>
            Go Back to Home
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
  },
  button: {
    marginTop: "16px",
    padding: "10px 18px",
    background: "#5D4037",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "6px",
  },
};

export default ErrorBoundary;