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
    //since=YYYY-MM-DD
    // for ( const key in this.state.commits ) {
    //   console.log(this.state.commits[key]);
    // }
    let commitDate = this.getDateFromDaysAgo(14);
    let url = 'https://api.github.com/repos/notonthehighstreet/notonthehighstreet/commits?sha=production_uk&since=' + commitDate + '&access_token=49783e8b119452a0d226ab69840221788c143c84'
    fetch(url)
  .then((response) => {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.json();
  })
  .then((commits) => {
    console.log(commits);
    this.setState({commits: commits});
    // set state to can render true;
  });
  },

  getDateFromDaysAgo: function(days) {
    const dayInMillis = 8.64e7;
    const daysAgo = dayInMillis*days;
    const commitDate = new Date(+new Date - daysAgo);

    const year = commitDate.getFullYear();
    const month = ('0' + (commitDate.getMonth() + 1)).slice(-2);
    const day = ('0' + commitDate.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  },

  render: function() {
    // render only if can render true
    let commits = this.state.commits.map((commit, i) => {
      return <Commit key={i} author={author.name} date={author.date} />
    })

    return (
      <div>
        {commits}
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.getElementById('content')
);
