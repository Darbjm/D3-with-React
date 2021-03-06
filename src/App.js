import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { json, active } from 'd3'
import './app.css';

import ChartWrapper from './ChartWrapper';
import Table from './Table'
import BubbleWrapper from './BubbleWrapper'
import GenderDropdown2 from './GenderDropdown';


class App extends Component {
  state = {
    data: [],
    activeName: null,
    gender: 'men'
  }

  componentWillMount() {
    json('https://udemy-react-d3.firebaseio.com/children.json')
      .then(data => this.setState({ data }))
      .catch(error => console.log(error))
  }

  updateName = (activeName) => this.setState({ activeName })

  updateData = (data) => this.setState({ data })

  renderChart() {
    if (this.state.data.length === 0) {
      return 'No data yet'
    }
    return <ChartWrapper data={this.state.data} updateName={this.updateName} gender={this.state.gender} />
  }

  genderSelected = (gender) => this.setState({ gender })


  render() {
    return (
      <div>
        <Navbar bg="light">
          <Navbar.Brand>D3 Projects: Learn D3 with react</Navbar.Brand>
        </Navbar>
        <Container>
          <br />
          <br />
          <br />
          <h4>An interactive and dynamic scatterplot</h4>
          <Row>
            <Col md={6} xs={12}>{this.renderChart()}</Col>
            <Col md={6} xs={12}><Table data={this.state.data} updateData={this.updateData} activeName={this.state.activeName}/></Col>
          </Row>
          <Row>
            <Col xs={12}><GenderDropdown2 genderSelected={this.genderSelected}/></Col>
          </Row>
          <hr />
          <h4>Using bubbles as a fun way to display images</h4>
          <Row>
            <Col xs={12}><BubbleWrapper /></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
