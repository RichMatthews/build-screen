import React from 'react';
import ReactDOM from 'react-dom';
require('es6-promise').polyfill();
require('isomorphic-fetch');


var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
      // this.setState({
      //   username: lastGist.owner.login,
      //   lastGistUrl: lastGist.html_url
      // });
  },

  componentWillMount: function() {
    fetch('https://api.github.com/repos/notonthehighstreet/notonthehighstreet/commits?sha=production_uk&access_token=a3b7da383c2bbb537923939afbb75e30438f94da')
  .then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.json();
  })
  .then(function(stories) {
      console.log(stories);
      // set state to can render true;
  });
  },

  render: function() {
    // render only if can render true
    return (
      <div>
        yo....!
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.getElementById('content')
);
