// import React, { useState } from "react";

// class Clock extends React.Component {
//   constructor() {
//     super();
//     this.state = { date: new Date() };
//     // this.handleClick = this.handleClick.bind(this);
//   }

//   // LIFECYCLE OF REACT

//   // CREATE

//   // componentDidMount() {
//   //   this.timerID = setInterval(() => this.tick(), 1000);
//   // }

//   // REMOVE

//   componentWillUnmount() {
//     clearInterval(this.timerID);
//   }

//   handleClick() {
//     this.setState({
//       date: new Date(),
//     });
//   }

//   handleClickWithParams(param) {
//     this.setState({
//       date: param,
//     });
//   }
//   // UPDATE

//   // tick() {
//   //   this.setState({
//   //     date: new Date(),
//   //   });
//   // }

//   render() {
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {this.state.date.toLocaleTimeString()}</h2>
//         <button onClick={() => this.handleClick()}>Click</button>
//         <button onClick={this.handleClickWithParams.bind(this, new Date())}>
//           Click with params
//         </button>
//       </div>
//     );
//   }
// }

// export default Clock;

import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

export default function Clock() {
  const [cloak, setCloak] = useState({
    date: new Date(),
  });

  function tick() {
    setCloak({
      date: new Date(),
    });
  }

  function handleClick() {
    setCloak({
      date: new Date(),
    });
  }
  function handleClickWithParams(param) {
    setCloak({
      date: param,
    });
  }

  // same as componentDidMount
  useEffect(() => {
    // update the document title using browser API
    const timerId = setInterval(() => tick(), 1000);
    // to clean up after this effect
    return () => clearInterval(timerId);
  }, []);

  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {cloak.date.toLocaleTimeString()}</h2>
      <button onClick={() => handleClick()}>Click</button>

      <button onClick={() => handleClickWithParams(new Date())}>
        Click with params
      </button>
    </div>
  );
}

export const TemperatureInCelcius = () => {
  return (
    <Row container="fluid" className="justify-content-center">
      <Col md={3} xs={2}>
        <Button variant="success">Click</Button>
      </Col>
      <Col md={3} xs={2}>
        <Button variant="primary">Click</Button>
      </Col>
      <Col md={3} xs={2}>
        <Button variant="secondary">Click</Button>
      </Col>
    </Row>
  );
};

export const Weather = () => {
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    for (let i = 1; i < 6; i++) {
      setTemp(temp + i);
      console.log("useEffect");
    }
  }, []);
  return (
    <div>
      <h2>It is {temp}.</h2>
    </div>
  );
};
