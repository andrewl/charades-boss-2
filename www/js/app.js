/**
 * The header, with a link to an info page
 */
var Header = React.createClass({displayName: "Header",
    render: function () {
        return (
            React.createElement("div", {className: "header"}, 
              this.props.title, 
              React.createElement("span", {className: "info"}, React.createElement("a", {href: "./info.html"}, "About"))
            )
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
var CharadesBoss = React.createClass({displayName: "CharadesBoss",

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
      React.createElement("div", {id: "charades-boss-app"}, 
        React.createElement(Header, {title: "Charades Boss!"}), 
        React.createElement(CharadesCard, {charade: this.state.current_charade}), 
        React.createElement(NextButton, {onClick: this.getNewCharade})
      )
    );
  }
});

/**
 * The next button. When clicked this will call the function
 * specified by the onClick property to select a new card and
 * refresh.
 */
var NextButton = React.createClass({displayName: "NextButton",
  render: function() {
    return (
      React.createElement("div", {className: "button", onClick: this.props.onClick}, "Pick Another")
      );
  }
});


/** 
 * The CharadesCard component. 
 */
var CharadesCard = React.createClass({displayName: "CharadesCard",
  render: function () {
      return (
          React.createElement("div", {className: "charade_card"}, 
            React.createElement("div", {className: "charade_title"}, this.props.charade.Title), 
            React.createElement("div", {className: "charade_type"}, "(", this.props.charade.Charade_type, ")")
          )
      );
  }
});

/**
 * Function to start the app by passing in the charades data
 * to a new CharadesBoss object.
 */
function startApp() {
  React.render(
    React.createElement(CharadesBoss, {charades: data}),
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
