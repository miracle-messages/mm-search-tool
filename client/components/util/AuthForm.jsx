import React from 'react';
import PropTypes from 'prop-types';

function renderField(name, displayName, type) {
    return <div>
        <label htmlFor={name}>
            <small>{displayName}</small>
        </label>
        <input name={name} type={type} />
    </div>;
}

function renderError(error) {
    if (error && error.response) {
        return <div>
            {error.response.data}
        </div>;
    } else {
        return null;
    }
}

export default function AuthForm({
    name,
    displayName,
    handleSubmit,
    error,
}) {
    return <div>
        <form onSubmit={handleSubmit} name={name}>
            {renderField('email', 'Email', 'text')}
            {renderField('password', 'Password', 'password')}
            <button type='submit'>{displayName}</button>
            {renderError(error)}
        </form>
    </div>;
}

AuthForm.propTypes = {
    name: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.shape({message: PropTypes.string}),
};
