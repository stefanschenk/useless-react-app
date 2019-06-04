import React, { Component } from "react";
import "./App.css";
import SelectedQuotes from "./SelectedQuotes";
import QuoteSearch from "./QuoteSearch";
import ContactForm from "./ContactForm";
import Client from "./Client";
import ContactsClient from "./ContactsClient";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import { isNullOrUndefined } from "util";

class App extends Component {
  state = {
    loggedInUser: undefined,
    loggedInWarning: "hidden",
    noRightsError: "hidden",
    selectedQuotes: [],
    quotesCount: 0,
    contactsCount: 0,
    username: "",
    password: ""
  };

  componentWillMount() {
    const isAuthorized =
      window.sessionStorage.getItem("isAuthorized") === "true";
    const { loggedInUser } = this.state;

    if (isAuthorized && !loggedInUser) {
      this.setState({
        loggedInUser: JSON.parse(localStorage.getItem("persistUser"))
      });
    }
  }

  componentDidMount() {
    this.countAllContacts();
    // this.countAllQuotes();

    if (isNullOrUndefined(sessionStorage.getItem("isAuthorized"))) {
      sessionStorage.setItem("isAuthorized", false);
    }
  }

  countAllContacts() {
    ContactsClient.getCount(result => {
      this.setState({
        contactsCount: result.count
      });
    }).catch(() => {
      console.warn("Can't reach contacts api!");
      this.setState({
        contactsCount: 0
      });
    });
  }

  countAllQuotes() {
    Client.getCount(result => {
      this.setState({
        quotesCount: result.count
      });
    }).catch(() => {
      console.warn("Can't reach quotes api!");
      this.setState({
        quotesCount: 0
      });
    });
  }

  removeQuoteItem = itemIndex => {
    const filteredQuotes = this.state.selectedQuotes.filter(
      (item, idx) => itemIndex !== idx
    );
    this.setState({ selectedQuotes: filteredQuotes });
  };

  addQuote = quote => {
    const newQuotes = this.state.selectedQuotes.concat(quote);
    this.setState({ selectedQuotes: newQuotes });
  };

  QuotesComponent = () => {
    const isAuthorized =
      window.sessionStorage.getItem("isAuthorized") === "true";
    const { selectedQuotes } = this.state;

    if (isAuthorized) {
      return (
        <div className="ui text container">
          <SelectedQuotes
            quotes={selectedQuotes}
            onQuoteClick={this.removeQuoteItem}
          />
          <QuoteSearch onQuoteClick={this.addQuote} />
        </div>
      );
    }
    return null;
  };

  ContactFormComponent = () => {
    const isAuthorized =
      window.sessionStorage.getItem("isAuthorized") === "true";

    if (isAuthorized) {
      return (
        <div className="ui text container">
          <ContactForm
            updateCount={() => {
              this.countAllContacts();
            }}
          />
        </div>
      );
    }
    return null;
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState(() => ({
      [name]: value
    }));
  };

  handleLogin = isAuthorizationEnabled => {
    if (isAuthorizationEnabled) {
      const { username, password } = this.state;
      const users = window.listUsers();

      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          const foundUser = users[i];
          foundUser.password = undefined;

          window.sessionStorage.setItem("isAuthorized", true);
          this.setState(
            {
              loggedInUser: foundUser,
              loggedInWarning: "hidden"
            },
            () => {
              localStorage.setItem(
                "persistUser",
                JSON.stringify(this.state.loggedInUser)
              );
            }
          );
        }
      }
    }
    return null;
  };

  LoginComponent = () => {
    const isAuthorized =
      window.sessionStorage.getItem("isAuthorized") === "true";
    const isAuthorizationEnabled = window.authorizationEnabled();
    const authEnabledErrorVisibility = isAuthorizationEnabled
      ? "hidden"
      : "visible";

    if (!isAuthorized) {
      const { username, password } = this.state;

      return (
        <div id="login-segment" className="ui placeholder segment">
          <div className={`ui ${authEnabledErrorVisibility} error message`}>
            <div className="header">Authorization disabled!</div>
            Authorization is disabled for this website.
          </div>
          <div className="ui placeholder segment">
            <div className="ui two column very relaxed stackable grid">
              <div className="column">
                <div className="ui form" id="credentials">
                  <div className="field">
                    <label>Username</label>
                    <div className="ui left icon input">
                      <input
                        name="username"
                        placeholder="Username"
                        type="text"
                        onChange={this.handleChange}
                        value={username}
                      />
                      <i className="user icon" />
                    </div>
                  </div>
                  <div className="field">
                    <label>Password</label>
                    <div className="ui left icon input">
                      <input
                        name="password"
                        type="password"
                        onChange={this.handleChange}
                        value={password}
                      />
                      <i className="lock icon" />
                    </div>
                  </div>
                  <div
                    className="ui blue submit button"
                    onClick={() => {
                      this.handleLogin(isAuthorizationEnabled);
                    }}
                  >
                    Login
                  </div>
                </div>
              </div>
              <div className="middle aligned column">
                <div
                  className="ui big button"
                  onClick={() => {
                    alert(
                      "It is not possible to signup to this awesome website at this moment!"
                    );
                  }}
                >
                  <i className="signup icon" />
                  Sign Up
                </div>
              </div>
            </div>
            <div className="ui vertical divider">Or</div>
          </div>
          <div style={{ fontStyle: "italic", textAlign: "left" }}>
            In the console, you could check for{" "}
            <span style={{ fontWeight: "800" }}>
              window.authorizationEnabled()
            </span>{" "}
            whether authorization is enabled.
            <br />
            Maybe you can override this method from your test.
            <br />
            Also check the <span style={{ fontWeight: "800" }}>
              Network
            </span> or <span style={{ fontWeight: "800" }}>Sources</span> tab in
            your browser developer tools to see if you can mock incoming
            authorization requests or scripts.
          </div>
        </div>
      );
    }

    return <Redirect to="/" />;
  };

  WelcomeComponent = () => {
    const { loggedInUser } = this.state;

    const isAuthorized =
      window.sessionStorage.getItem("isAuthorized") === "true";

    if (isAuthorized) {
      return (
        <div id="welcome-segment" className="ui placeholder segment">
          <div>
            <h2>Welcome</h2>
            <p>
              You are succesfully logged in as{" "}
              <strong>{loggedInUser.username}</strong>
              <br />
              You have access to the following pages:{" "}
              <strong>{loggedInUser.pages.join(",")}</strong>
            </p>
            <p
              style={{
                fontStyle: "italic",
                marginTop: "40px",
                textAlign: "left"
              }}
            >
              Not the correct rights to all the pages and no other credentials?
              <br />
              Please check the{" "}
              <span style={{ fontWeight: "800" }}>Network</span> or{" "}
              <span style={{ fontWeight: "800" }}>Sources</span> tab in your
              browser developer tools to see if you can mock incoming
              authorization requests of scripts.
            </p>
          </div>
        </div>
      );
    }

    return (
      <Redirect
        to={{
          pathname: "/login"
        }}
      />
    );
  };

  render() {
    let { contactsCount, quotesCount, loggedInUser } = this.state;

    const isAuthorized =
      window.sessionStorage.getItem("isAuthorized") === "true";
    const logoutButtonState = isAuthorized ? "active" : "disabled";
    const contactsButtonState =
      isAuthorized && loggedInUser.pages.includes("contacts")
        ? "active"
        : "disabled";
    const quotesButtonState =
      isAuthorized && loggedInUser.pages.includes("quotes")
        ? "active"
        : "disabled";

    const ContactsButton = withRouter(({ history }) => (
      <div
        className={`ui right labeled button ${contactsButtonState}`}
        tabIndex="1"
        onClick={() => {
          if (isAuthorized && loggedInUser.pages.includes("contacts")) {
            history.push("/contacts");
          } else if (isAuthorized && !loggedInUser.pages.includes("contacts")) {
            this.setState({
              noRightsError: "visible"
            });
          } else {
            this.setState({
              loggedInWarning: "visible"
            });
          }
        }}
      >
        <span className="ui basic right pointing label">{contactsCount}</span>
        <div className="ui green button">
          <i className="address book icon" /> Contacts
        </div>
      </div>
    ));
    const QuotesButton = withRouter(({ history }) => (
      <div
        className={`ui right labeled button ${quotesButtonState}`}
        style={{ marginRight: "6px" }}
        tabIndex="0"
        onClick={() => {
          if (isAuthorized && loggedInUser.pages.includes("quotes")) {
            history.push("/quotes");
          } else if (isAuthorized && !loggedInUser.pages.includes("quotes")) {
            this.setState({
              noRightsError: "visible"
            });
          } else {
            this.setState({
              loggedInWarning: "visible"
            });
          }
        }}
      >
        <span className="ui basic right pointing label">{quotesCount}</span>
        <div className="ui green button">
          <i className="talk icon" /> Quotes
        </div>
      </div>
    ));
    const LogoutButton = withRouter(({ history }) => (
      <button
        className={`ui orange ${logoutButtonState} button`}
        onClick={() => {
          window.sessionStorage.setItem("isAuthorized", false);
          this.setState({
            loggedInUser: undefined,
            password: ""
          });
          history.push("/");
        }}
      >
        Uitloggen
      </button>
    ));

    return (
      <Router>
        <div className="App container">
          <div className="ui text container">
            <div className="ui buttons" style={{ marginBottom: "20px" }}>
              <Link to="/">
                <button
                  className="ui active blue button"
                  style={{ marginRight: "6px" }}
                >
                  Home
                </button>
              </Link>
              <QuotesButton />
              <ContactsButton />
              <div className="or" />
              <LogoutButton />
            </div>

            <div className={`ui ${this.state.loggedInWarning} warning message`}>
              <i
                className="close icon"
                onClick={() => {
                  this.setState({
                    loggedInWarning: "hidden"
                  });
                }}
              />
              <div className="header">Unauthorized!</div>
              Log in below, then try again
            </div>

            <div className={`ui ${this.state.noRightsError} error message`}>
              <i
                className="close icon"
                onClick={() => {
                  this.setState({
                    noRightsError: "hidden"
                  });
                }}
              />
              <div className="header">Unauthorized!</div>
              You are not authorized to view this page.
            </div>

            <div className="ui text container">
              <Route path="/" exact component={this.WelcomeComponent} />
              <Route path="/login" component={this.LoginComponent} />
              <Route path="/quotes" component={this.QuotesComponent} />
              <Route path="/contacts" component={this.ContactFormComponent} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
