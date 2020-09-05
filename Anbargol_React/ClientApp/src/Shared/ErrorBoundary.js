import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <React.Fragment>
          <h1 style={{ textAlign: 'center' }}>⚠</h1>
          <h4 style={{ textAlign: 'center' }}>
            ...خطایی در نرم افزار رخ داده است
            <br />
            <br />
            ...لطفا با پشتیبان نرم افزار تماس بگیرید
          </h4>
          <br />
          <div>
            {this.state.error && this.state.error.toString()}
          </div>
        </React.Fragment>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;