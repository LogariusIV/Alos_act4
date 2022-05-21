import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class homeList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchmatchday = this.onChangeSearchmatchday.bind(this);
    this.retrievehome = this.retrievehome.bind(this);
    this.retrieveaway = this.retrieveaway.bind(this);
    this.retrievehomescore = this.retrievehomescore.bind(this);
    this.retrieveawayscore = this.retrieveawayscore.bind(this);
    
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllhome = this.removeAllhome.bind(this);
    this.removeAllaway = this.removeAllaway.bind(this);
    this.removeAllhomescore = this.removeAllhomescore.bind(this);
    this.removeAllawayscore = this.removeAllawayscore.bind(this);
    this.searchmatchday = this.searchmatchday.bind(this);

    this.state = {
      home: [],
      currentTutorial: null,
      currentIndex: -1,
      searchmatchday: ""
    };
  }

  componentDidMount() {
    this.retrievehome();
  }
  componentDidMount() {
    this.retrieveaway();
  }
  componentDidMount() {
    this.retrievehomescore();
  }
  componentDidMount() {
    this.retrieveawayscore();
  }

  onChangeSearchmatchday(e) {
    const searchmatchday = e.target.value;

    this.setState({
      searchmatchday: searchmatchday
    });
  }

  retrievehome() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          home: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  retrieveaway() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          home: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  retrievehomescore() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          home: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  retrieveawayscore() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          home: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievehome();
    this.retrieveaway();
    this.retrievehomescore();
    this.retrieveawayscore();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeAllhome() {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  removeAllaway() {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  removeAllhomescore() {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  removeAllawayscore() {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchmatchday() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });

    TutorialDataService.findBymatchday(this.state.searchmatchday)
      .then(response => {
        this.setState({
          home: response.data,
          away: response.data,
          homescore: response.data,
          awayscore: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchmatchday, home, away, homescore, awayscore, currentTutorial, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by matchday"
              value={searchmatchday}
              onChange={this.onChangeSearchmatchday}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchmatchday}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>home List</h4>

          <ul className="list-group">
            {home &&
              home.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.matchday}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllhome}
          >
            Remove home
          </button>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllaway}
          >
            Remove away
          </button>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllhomescore}
          >
            Remove home score
          </button>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllawayscore}
          >
            Remove away score
          </button>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Match stat</h4>
              <div>
                <label>
                  <strong>matchday:</strong>
                </label>{" "}
                {currentTutorial.matchday}
              </div>
              <div>
                <label>
                  <strong>home:</strong>
                </label>{" "}
                {currentTutorial.home}
              </div>
              <div>
                <label>
                  <strong>away:</strong>
                </label>{" "}
                {currentTutorial.away}
              </div>
              <div>
                <label>
                  <strong>home score:</strong>
                </label>{" "}
                {currentTutorial.homescore}
              </div>
              <div>
                <label>
                  <strong>away score:</strong>
                </label>{" "}
                {currentTutorial.awayscore}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/home/" + currentTutorial.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
              <Link
                to={"/away/" + currentTutorial.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
              <Link
                to={"/homescore/" + currentTutorial.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
              <Link
                to={"/awayscore/" + currentTutorial.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>click on match stat to see stats...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
