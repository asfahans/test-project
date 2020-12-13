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
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProfileScreen from './screens/ProfileScreen';
import TicketListScreen from './screens/TicketListScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container fluid style={{ width: '95%' }}>
          <Route path='/register' component={RegisterScreen} exact />
          <Route path='/create' component={CreateTicketScreen} exact />
          <Route path='/ticket/:id' component={TicketScreen} exact />
          <Route path='/admin/userlist' component={UserListScreen} exact />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} exact />
          <Route path='/admin/ticketlist' component={TicketListScreen} exact />
          {/* Dashboard Route */}
          {/* Normal with Pagination */}
          <Route
            path='/dashboard/page/:pageNumber'
            component={DashboardScreen}
            exact
          />
          {/* Search Pagination */}
          <Route
            path='/dashboard/:keyword/page/:pageNumber'
            component={DashboardScreen}
            exact
          />
          {/* Single page search */}
          <Route path='/dashboard/:keyword' component={DashboardScreen} exact />
          {/* normal dashboard */}
          <Route path='/dashboard' component={DashboardScreen} exact />
          {/* END: Dashboard Route */}

          {/* My Tickets Route */}
          <Route
            path='/profile/page/:pageNumber'
            component={ProfileScreen}
            exact
          />
          <Route
            path='/profile/:keyword/page/:pageNumber'
            component={ProfileScreen}
            exact
          />
          <Route path='/profile/:keyword' component={ProfileScreen} exact />
          <Route path='/profile' component={ProfileScreen} exact />
          {/* END: My Tickets Route */}
          <Route
            path='/admin/ticketlist/page/:pageNumber'
            component={TicketListScreen}
            exact
          />
          <Route
            path='/admin/ticketlist/:keyword/page/:pageNumber'
            component={TicketListScreen}
            exact
          />
          <Route
            path='/admin/ticketlist/:keyword'
            component={TicketListScreen}
            exact
          />
          <Route path='/admin/userlist/:keyword' component={UserListScreen} />
          <Route path='/' component={LoginScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
