import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Login, Signup, UserHome} from './components';
import {me} from './store';

function mapStateToProps(state) {
    return {
        isLoggedIn: !!state.user.id,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUser: () => dispatch(me()),
    };
}

class Routes extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            {this.renderLoggedInRoutes()}
            <Route component={Login} />
        </Switch>;
    }

    renderLoggedInRoutes() {
        if (this.props.isLoggedIn) {
            return <Switch>
                <Route path='/home' component={UserHome} />
            </Switch>;
        } else {
            return null;
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));

Routes.propTypes = {
    fetchUser: PropTypes.func,
    isLoggedIn: PropTypes.bool.isRequired,
};
