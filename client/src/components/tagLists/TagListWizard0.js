// an importable form component
import _ from 'lodash';
import React, { Component } from 'react';
// this import allows it to access the redux-store like a connect helper
// the Field class can represent any input field
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import TagListWizardField from './TagListWizardField';
import formFields from './formFields-step-1';

class TagListWizard0 extends Component {

    renderFields(label, name) {
        return _.map(formFields, ({ label, name }) => {
            return <Field key={name} label={label} name={name} component={TagListWizardField} type='text' />
        });
    }

    render(){
        return (
            <div>
                {/* If onSurveySubmit had () it would call the function the instant the component is rendered */}
                <form onSubmit={this.props.handleSubmit(this.props.onTagListSubmit)}>
                    {this.renderFields()}
                    <Link to="/" onClick={() => window.location.reload()} className="red btn-flat white-text">
                        Cancel
                        <i className="material-icons right">cancel</i>
                    </Link>
                    <button className="teal btn-flat right white-text" type="submit">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {

    const errors = {};

    _.each(formFields, ({ name }) => {
        if(!values[name]) {
            errors[name] = `You must provide a ${name}.`;
        }
    });
    // if errors object is empty, it will allow the form to go through
    return errors;
}

export default reduxForm({
    // es6 shorthand for validate:validate
    validate,
    form: 'tagListWizard',
    // this property persists values
    destroyOnUnmount: false
})(TagListWizard0);