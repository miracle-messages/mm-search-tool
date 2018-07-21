import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {email: state.user.email};
}

function UserHome({email}) {
    return <div>
        <h3>Welcome, {email}</h3>
    </div>;
}

export default connect(mapStateToProps)(UserHome);

UserHome.propTypes = {
    email: PropTypes.string.isRequired,
};
