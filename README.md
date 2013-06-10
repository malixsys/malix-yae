##  malix-yae

#### a Yoeman Angular Express Reloading Application Example

### Initial setup

1. Ensure that you have [node](http://nodejs.org/), [npm](https://npmjs.org/) and [yoeman](http://yeoman.io/) installed and in your path
1. Clone this repository
1. Run `npm install` to pull down all build-time dependencies

### Starting the server

- The default grunt task will start the server and watch for changes.
  - To run the default grunt task, run `grunt`
- The server starts at `http://localhost:5000` by default

### Automatic Change Monitoring
- When changes are made to `html/server` or `lib`, the server is restarted and the page should refresh
- When changes are made to *HTML* or *JS* files under `html/client`, the server is not restarted but the page should refresh
- When changes are made to *CSS* files under `html/client`, the new stylesheet should be injected directly without refreshing


