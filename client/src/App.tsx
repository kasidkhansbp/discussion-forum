import React from 'react';
import { Route, withRouter, RouteComponentProps,BrowserRouter as Router,Switch } from "react-router-dom";
import './App.css';
import HeaderComponent from './components/HeaderComponent';
import HomePage from './pages/HomePage';
import { EventName } from './services/remote/Types';
import { on } from './services/remote/handlers';
import DiscussionPage from './pages/DiscussionPage';
import AddDiscussionPage from './pages/AddDiscussionPage';
import DiscussionDetailsPage from './pages/DiscussionDetailsPage';
import LoginPage from './pages/LoginPage';
import NotificationComponent from './components/NotificationComponent';
interface Props extends RouteComponentProps {
}

interface State {
  redirectLink?: string;
}

class App extends React.PureComponent<Props, State> {
  state: State = {

  }

  private off: any;

  componentDidMount() {
    this.off = on(EventName.Unauthorised, (link: string) => {
      this.setState({redirectLink: link});
    });
  }

  componentWillUnmount() {
    if (this.off) {
      this.off();
    }
  }

  render() {
    return (
     <Router>
     <div className="App">
       <NotificationComponent />
      <HeaderComponent />
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/home" component={HomePage}/>
          <Route path="/discussion" component={DiscussionPage}/>
          <Route path="/discussion-details/:id" component={DiscussionDetailsPage}/>
          <Route path="/add-discussion" exact component={AddDiscussionPage}/>
          <Route path="/login" component={LoginPage}/>
        </Switch>
    </div>
    </Router>
    );
  }
}

export default withRouter(App);
