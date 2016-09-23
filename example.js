import React from 'react';
import ReactDOM from 'react-dom';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const Commit = (props) => {
  return (
    <a className="commit" href={props.url} target="_blank">
      <div>
        <div className="message">{props.message}</div>
        <div className="author">{props.author}</div>
        <div className="date">{props.date}</div>
      </div>
   </a>
  )
}

var BuildScreen = React.createClass({
  getInitialState: function() {
    return {
      commits: false
    };
  },

  componentDidMount: function() {
    this.getCommits();
    setInterval(()=> {
      this.getCommits();
    }, 300000); // 5 minutes
  },

  getCommits: function() {
    let commitDate = this.getDateFromDaysAgo(14);
    let TOKEN = process.env.GITHUB_TOKEN;
    console.log(process.env);
    console.log('******************************');
    console.log(TOKEN);
    let url = 'https://api.github.com/repos/notonthehighstreet/notonthehighstreet/commits?sha=production_uk&since=' + commitDate + '&access_token=' + TOKEN;
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
    let commits;
    if(this.state.commits) {
      commits = this.state.commits.map((commit, i) => {
        return <Commit  key={i}
                        author={commit.commit.author.name}
                        date={new Date(commit.commit.author.date).toDateString()}
                        message={commit.commit.message}
                        url={commit.html_url} />
      })
    }

    return (
      <div>
        {commits}
      </div>
    );
  }
});

ReactDOM.render(
  <BuildScreen source="https://api.github.com/users/octocat/gists" />,
  document.getElementById('content')
);
