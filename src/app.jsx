import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader'

import AddSceneForm from './components/scenes/add';
import ListScenes from './components/scenes/list';
import SceneDetails from './components/scenes/details';
import MapView from './components/mapview';

const mapStateToProps = ({ scenes, main }) => ({ scenes, ...main });

class ConnectedApp extends Component {
  constructor() {
    super();
    this.state = {
      currentSceneId: null,
      showList: false,
    };

    this.handleSceneShowClicked = this.handleSceneShowClicked.bind(this);
  }

  handleSceneShowClicked(id = null) {
    this.setState({ currentSceneId: id });
  }

  render() {
    const { currentSceneId, showList } = this.state;
    const { scenes, isLoading, tilesLoading } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="https://eox.at/" target="_blank">
            <img src="images/EOX_Logo_white.svg" />
          </a>

          <a className="navbar-brand" style={{color: "white"}}>
            COG-Explorer
          </a>

          <div className="collapse navbar-collapse">
            <form className="form-inline my-2 my-lg-0">
              <AddSceneForm />
              {/* <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
              <i
                className="fas fa-spin fa-cog text-light"
                style={{
                  position: 'absolute',
                  right: '60px',
                  // display: this.isLoading() ? 'none' : 'flex',
                  visibility: (isLoading || tilesLoading > 0) ? 'visible' : 'hidden',
                }}
              />
            </form>
          </div>
        </nav>


        <div style={{ height: 'calc(100% - 50px)' }}>
          <MapView />
        </div>
        <div className="container">
          <button
            className="btn btn-large"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
            onClick={() => this.setState({ showList: !showList })}
            disabled={scenes.length === 0}
          >
            <i className="fas fa-bars" />
          </button>
          {
            showList && scenes.length > 0 && <div
              className="card card-body"
              style={{
                position: 'absolute',
                top: '10px',
                right: '60px',
                width: '50%',
                maxHeight: 'calc(100% - 20px)',
                overflowY: 'scroll',
              }}
            >
              {/* { <ListScenes onSceneClicked={this.handleSceneShowClicked} /> } */}
              { scenes.length > 0 &&
                <SceneDetails id={scenes[0].id} onSceneHide={this.handleSceneShowClicked} />
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

const App = hot(module)(connect(mapStateToProps)((ConnectedApp)));

export default App;
