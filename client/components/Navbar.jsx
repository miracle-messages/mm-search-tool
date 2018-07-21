import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';

function mapStateToProps(state) {
    return {
        isLoggedIn: !!state.user.id,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleLogout: () => dispatch(logout()),
    };
}

function renderContent(isLoggedIn, handleLogout) {
    if (isLoggedIn) {
        return <div>
            <Link to='/home'>Home</Link>
            <button
                type='button'
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>;
    } else {
        return <div>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
        </div>;
    }
}

function Navbar({handleLogout, isLoggedIn}) {
    return <div>
        <h1>MIRACLE MESSAGES</h1>
        <nav>
            {renderContent(isLoggedIn, handleLogout)}
        </nav>
    </div>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

Navbar.propTypes = {
    handleLogout: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};
