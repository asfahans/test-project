import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container fluid>
          <Route path='/homescreen' component={HomeScreen} exact />

          <Route path='/' component={LoginScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
