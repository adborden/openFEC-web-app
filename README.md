openfec-web-app
===============

**Develop**
[![Build Status](https://img.shields.io/travis/18F/openFEC-web-app/develop.svg)](https://travis-ci.org/18F/openFEC-web-app)
[![Test Coverage](https://img.shields.io/codecov/c/github/18F/openFEC-web-app/develop.svg)](https://codecov.io/github/18F/openFEC-web-app)

**Master**
[![Build Status](https://img.shields.io/travis/18F/openFEC-web-app/master.svg)](https://travis-ci.org/18F/openFEC-web-app)
[![Test Coverage](https://img.shields.io/codecov/c/github/18F/openFEC-web-app/master.svg)](https://codecov.io/github/18F/openFEC-web-app)
[![Code Climate](https://img.shields.io/codeclimate/github/18F/openFEC-web-app.svg)](https://codeclimate.com/github/18F/openFEC-web-app)
[![Dependencies](https://img.shields.io/gemnasium/18F/openFEC-web-app.svg)](https://gemnasium.com/18F/openFEC-web-app)

## Our Repos

* [fec](https://github.com/18F/fec) - A discussion forum where we can discuss the project.
* [openfec](https://github.com/18F/openfec) - Where the API work happens. We also use this as the central repo to create issues related to each sprint and our backlog here. If you're interested in contribution, please look for "help wanted" tags or ask!
* [openfec-web-app](https://github.com/18f/openfec-web-app) - Where the campaign finance web app work happens. Note that issues and discussion tend to happen in the other repos.
* [fec-alpha](https://github.com/18F/fec-alpha) - A place to explore and evolve a new site for the Federal Election Commission.

### Installing
This application is in [Flask](http://flask.pocoo.org/). Client side features are managed using [Browserify](http://browserify.org/) and [npm](https://www.npmjs.org/).

It uses Python version 3.4. Its recommended that you create a [virtualenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/) before installing Python dependencies.

Install Python dependencies:

    $ pip install -r requirements.txt

Install client side dependencies:

    $ npm install -g browserify
    $ npm install

If you plan to do client side JS developent, you will want to install [Watchify](https://github.com/substack/watchify):
```
$ npm install -g watchify
```

### Configuration

The Flask app talks to an API for data. See [openFEC](http://github.com/18F/openFEC).

The app has HTTP auth enabled. You will need to set environment variables with your desired username and password.
Those vars are `FEC_WEB_USERNAME` and `FEC_WEB_PASSWORD`. There are other config environment variables that you
can set, but that have defaults. You can see those in `openfecwebapp/config.py`.

#### Required environmental variables
To start developing locally, set the following environmental variables:

First, set `FEC_WEB_API_URL` to the URL of the API. You may serve the API locally, or to use the production API use:

    $ export FEC_WEB_API_URL=https://api.open.fec.gov

If you're using the production API, enter your API Key (get one [via data.gov](https://api.data.gov/signup/)):

    $ export FEC_WEB_API_KEY=yourkey

#### Optional environmental variables

To run the server in debug mode set:

    $ export FEC_WEB_DEBUG=true

To use styles served from a custom location (e.g., if developing against a local `fec-style`):

    $ export FEC_WEB_STYLE_URL=http://localhost:8080/css/styles.css

To be able to have links between this app and a local installation of the cms:

    $ export FEC_CMS_URL=http://localhost:8000

To avoid repeated requests to the OpenFEC API, the webapp can store recent API responses
in a small in-memory cache. The cache can be enabled by setting the `FEC_WEB_CACHE`
environment variable; the size of the cache, in items, is controlled by the
`FEC_WEB_CACHE_SIZE` environment variable. When the cache is enabled, views may
be stale for up to the cache duration set by the API.

### Running the site locally
To make the site fully functional, you will need to compile the client side JavaScript and Sass:

    $ npm run build

And then start the server:

    $ python __init__.py
    
If you'd like the app to cache API requests it makes, use the `--cached` flag:

    $ python __init__.py --cached

### Development
To compile client side JS once:

    $ npm run build-js

Compile Sass once:

    $ npm run build-sass

Compile JS as changes are made:

    $ npm run watch-js

Compile Sass as changes are made:

    $ npm run watch-sass

### Deployment

See directions in the 18F/openFEC repo.

### Run Tests
#### Unit Tests

    $ py.test

#### Browser Tests
First, install [PhantomJS](http://phantomjs.org/).

Configure development environment:

    $ unset FEC_WEB_API_KEY
    $ export FEC_WEB_API_URL=http://fec-dev-api.18f.gov
    $ export FEC_WEB_TEST=true

Run development app server:

    $ python __init__.py

While app is running, run tests:

    $ py.test --selenium

If the development API is down or for testing with feature branches of the API,
a local API server can be used:

    $ unset FEC_WEB_API_URL

#### Git Hooks

This repo includes optional post-merge and post-checkout hooks to ensure that
dependencies and compiled assets are up to date. If enabled, these hooks will
update Python and Node dependencies, and rebuild compiled JS and CSS files,
on checking out or merging changes to `requirements.txt`, `package.json`,
or source JS or SCSS files. To enable the hooks, run

    $ invoke add_hooks

To disable, run

    $ invoke remove_hooks
