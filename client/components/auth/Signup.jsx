import {connect} from 'react-redux';

import AuthForm from '../util/AuthForm';
import {auth} from '../../store';

function mapStateToProps(state) {
    return {
        name: 'signup',
        displayName: 'Sign Up',
        error: state.user.error,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleSubmit(event) {
            event.preventDefault();
            const email = event.target.email.value;
            const password = event.target.password.value;
            dispatch(auth(email, password, 'signup'));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
