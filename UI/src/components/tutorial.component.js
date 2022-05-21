import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangematchday = this.onChangematchday.bind(this);
    this.onChangehome = this.onChangehome.bind(this);
    this.onChangeaway = this.onChangeaway.bind(this);
    this.onChangehomescore = this.onChangehomescore.bind(this);
    this.onChangeawayscore = this.onChangeawayscore.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        matchday: "",
        home: "",
        away: "",
        homescore: "",
        awayscore: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTutorial(this.props.match.params.id);
  }

  onChangematchday(e) {
    const matchday = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          matchday: matchday
        }
      };
    });
  }

  onChangehome(e) {
    const home = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        home: home
      }
    }));
  }
  onChangeaway(e) {
    const away = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        away: away
      }
    }));
  }
  onChangehomescore(e) {
    const homescore = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        homescore: homescore
      }
    }));
  }
  onChangeawayscore(e) {
    const awayscore = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        awayscore: awayscore
      }
    }));
  }

  getTutorial(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentTutorial: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTutorial.id,
      matchday: this.state.currentTutorial.matchday,
      home: this.state.currentTutorial.home,
      away: this.state.currentTutorial.away,
      homescore: this.state.currentTutorial.homescore,
      awayscore: this.state.currentTutorial.awayscore,
      published: status
    };

    TutorialDataService.update(this.state.currentTutorial.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTutorial() {
    TutorialDataService.update(
      this.state.currentTutorial.id,
      this.state.currentTutorial
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The stats was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTutorial() {    
    TutorialDataService.delete(this.state.currentTutorial.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/matchstats')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTutorial } = this.state;

    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Match stats</h4>
            <form>
              <div className="form-group">
                <label htmlFor="matchday">matchday</label>
                <input
                  type="text"
                  className="form-control"
                  id="matchday"
                  value={currentTutorial.matchday}
                  onChange={this.onChangematchday}
                />
              </div>
              <div className="form-group">
                <label htmlFor="home">home</label>
                <input
                  type="text"
                  className="form-control"
                  id="home"
                  value={currentTutorial.home}
                  onChange={this.onChangehome}
                />
              </div>
              <div className="form-group">
                <label htmlFor="away">away</label>
                <input
                  type="text"
                  className="form-control"
                  id="away"
                  value={currentTutorial.away}
                  onChange={this.onChangeaway}
                />
              </div>
              <div className="form-group">
                <label htmlFor="homescore">homescore</label>
                <input
                  type="text"
                  className="form-control"
                  id="homescore"
                  value={currentTutorial.homescore}
                  onChange={this.onChangehomescore}
                />
              </div>
              <div className="form-group">
                <label htmlFor="awayscore">awayscore</label>
                <input
                  type="text"
                  className="form-control"
                  id="awayscore"
                  value={currentTutorial.awayscore}
                  onChange={this.onChangeawayscore}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentTutorial.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorial}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>click on match stat to see stats...</p>
          </div>
        )}
      </div>
    );
  }
}
