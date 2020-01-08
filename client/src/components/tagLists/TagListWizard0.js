// an importable form component
import _ from 'lodash';
import React, { Component } from 'react';
// this import allows it to access the redux-store like a connect helper
// the Field class can represent any input field
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import formFields from './formFields-step-1';
import renderFields from './renderFields'

class TagListWizard0 extends Component {    

    render(){
        return (
            <div className='container soft-outter' style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'3rem'}}>
                <div className='soft-inner'>
                    {/* If onSurveySubmit had () it would call the function the instant the component is rendered */}
                    
                    <form onSubmit={this.props.handleSubmit(this.props.onTagListSubmit)} style={{height: '100%', width: '100%', padding: '1rem'}}>
                        {renderFields()}
                        <div className='soft-outter btn-wrapper'>
                            <button className="soft-inner right flex-column btn-soft" style={{padding:'1rem', marginBottom: '.5rem'}} type="submit">
                                <i className="material-icons large">arrow_forward</i>
                            </button>
                        </div>
                    </form>
                </div>
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