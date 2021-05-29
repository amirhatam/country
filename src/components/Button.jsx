import React from "react";

class Button extends React.Component {
  render() {
    return (
      <div className="">
        {/* <button 
                onClick={this.props.clickButton}
                className="btn btn-primary px-5 mb-1 mx-2 fw-bold my-3 "
                >{this.props.children}</button> */}
        <button onClick={this.props.clickButton} className="btn btn-success">
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default Button;
