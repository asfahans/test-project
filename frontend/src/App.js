import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardScreen from './screens/DashboardScreen';
import TicketScreen from './screens/TicketScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CreateTicketScreen from './screens/CreateTicketScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container fluid style={{ width: '95%' }}>
          <Route path='/register' component={RegisterScreen} exact />
          <Route path='/create' component={CreateTicketScreen} exact />
          <Route path='/ticket/:id' component={TicketScreen} exact />
          <Route path='/dashboard' component={DashboardScreen} exact />
          <Route path='/' component={LoginScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
