import React from 'react';
import { Field } from 'redux-form';
import _ from 'lodash';
import formFields from './formFields-step-2';
import TagListWizardField from './TagListWizardField';

export default function renderFields() {
    return _.map(formFields, ({ label, name }) => {
        return <Field style={{padding:'5px',background:'#ffffff'}} key={name} label={label} name={name} component={TagListWizardField} type='text' />
    });
}