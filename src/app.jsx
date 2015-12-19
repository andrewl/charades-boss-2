/**
 * The header, with a link to an info page
 */
var Header = React.createClass({
    render: function () {
        return (
            <div className="header">
              {this.props.title}
              <span className="info"><a href="./info.html">About</a></span>
            </div>
        );
    }
});


/**
 * The main applicaton class. Contains the subcomponents and functionality
 * to pick a random charade.
 *
 * props consists of:
 *  - charades: a json structure of all of the charades in the system
 *
 * state consists of:
 *  - current_charade: the currently selected charade
 */
var CharadesBoss = React.createClass({

  /**
   * Returns the object created by getStateWithRandomCharade
   */
  getInitialState: function() {
    return this.getStateWithRandomCharade();
  },

  /**
   * Updates the state of the object to a new random charade.
   * Calling setState will ensure that this component is 
   * re-rendered.
   */
  getNewCharade: function() {
    this.setState(this.getStateWithRandomCharade());
  },

  /**
   * Returns an object consisting of the following simple structure:
   * { charade: {charadeTitle: "A Book Title", charadeType: "Book"} }
   */
  getStateWithRandomCharade: function() {
    return {current_charade: this.selectRandomCharade()};
  },

  /**
   * Selects a random charade from the list of charades we know about.
   */
  selectRandomCharade: function() {
    return this.props.charades[Math.floor(Math.random() * this.props.charades.length)];
  },

  /**
   * The render function for the app. The main thing to note is that
   * the NextButton is passed a callback to a function in its parent's
   * (ie this) object when onClick is called. This is because native 
   * ReactJS components filter down from parents to children.
   */
  render: function() {
    return (
      <div id="charades-boss-app">
        <Header title="Charades Boss!" />
        <CharadesCard charade={this.state.current_charade} />
        <NextButton onClick={this.getNewCharade} />
      </div>
    );
  }
});

/**
 * The next button. When clicked this will call the function
 * specified by the onClick property to select a new card and
 * refresh.
 */
var NextButton = React.createClass({
  render: function() {
    return (
      <div className="button" onClick={this.props.onClick}>Pick Another</div>
      );
  }
});


/** 
 * The CharadesCard component. 
 */
var CharadesCard = React.createClass({
  render: function () {
      return (
          <div className="charade_card">
            <div className="charade_title">{this.props.charade.Title}</div>
            <div className="charade_type">({this.props.charade.Charade_type})</div>
          </div>
      );
  }
});

/**
 * Function to start the app by passing in the charades data
 * to a new CharadesBoss object.
 */
function startApp() {
  React.render(
    <CharadesBoss charades={data}/>,
    document.body
  );
}

/**
 * If we're compiled then wait until the deviceready callback is called before
 * starting the app. Otherwise, just start it right now.
 */
if (window.cordova) {
  document.addEventListener('deviceready', function () {
    startApp();
  }, false);
}
else {
  startApp();
}
