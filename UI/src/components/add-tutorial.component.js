import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangematchday = this.onChangematchday.bind(this);
    this.onChangehome = this.onChangehome.bind(this);
    this.onChangeaway = this.onChangeaway.bind(this);
    this.onChangehomescore = this.onChangehomescore.bind(this);
    this.onChangeawayscore = this.onChangeawayscore.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      matchday: "",
      home: "",
      away: "",
      homescore: "",
      awayscore: "",
      published: false,

      submitted: false
    };
  }

  onChangematchday(e) {
    this.setState({
      matchday: e.target.value
    });
  }

  onChangehome(e) {
    this.setState({
      home: e.target.value
    });
  }
  onChangeaway(e) {
    this.setState({
      away: e.target.value
    });
  }
  onChangeawayscore(e) {
    this.setState({
      awayscore: e.target.value
    });
  }
  onChangehomescore(e) {
    this.setState({
      homescore: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      matchday: this.state.matchday,
      home: this.state.home,
      away: this.state.away,
      homescore: this.state.homescore,
      awayscore: this.state.awayscore
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          matchday: response.data.matchday,
          home: response.data.home,
          away: response.data.away,
          homescore: response.data.homescore,
          awayscore: response.data.awayscore,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      matchday: "",
      home: "",
      away: "",
      homescore: "",
      awayscore: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="matchday">matchday</label>
              <input
                type="text"
                className="form-control"
                id="matchday"
                required
                value={this.state.matchday}
                onChange={this.onChangematchday}
                name="matchday"
              />
            </div>

            <div className="form-group">
              <label htmlFor="home">home</label>
              <input
                type="text"
                className="form-control"
                id="home"
                required
                value={this.state.home}
                onChange={this.onChangehome}
                name="home"
              />
            </div>
            <div className="form-group">
              <label htmlFor="away">away</label>
              <input
                type="text"
                className="form-control"
                id="away"
                required
                value={this.state.away}
                onChange={this.onChangeaway}
                name="away"
              />
            </div>
            <div className="form-group">
              <label htmlFor="homescore">home score</label>
              <input
                type="text"
                className="form-control"
                id="homescore"
                required
                value={this.state.homescore}
                onChange={this.onChangehomescore}
                name="homescore"
              />
            </div>
            <div className="form-group">
              <label htmlFor="awayscore">away score</label>
              <input
                type="text"
                className="form-control"
                id="awayscore"
                required
                value={this.state.awayscore}
                onChange={this.onChangehome}
                name="awayscore"
              />
            </div>

            <button onClick={this.saveTutorial} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
