import React from 'react';
import HomeComponent from '../components/HomeComponent';

interface Props {
    location: any
}

class HomePage extends React.PureComponent<Props> {

  render() {
      return (
          <HomeComponent/>
      )
  }
}

export default HomePage
