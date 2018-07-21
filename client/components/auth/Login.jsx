import {connect} from 'react-redux';

import AuthForm from '../util/AuthForm';
import {auth} from '../../store';

function mapStateToProps(state) {
    return {
        name: 'login',
        displayName: 'Login',
        error: state.user.error,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleSubmit(event) {
            event.preventDefault();
            const email = event.target.email.value;
            const password = event.target.password.value;
            dispatch(auth(email, password, 'login'));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
