import React from 'react';
import { Field } from 'redux-form';
import _ from 'lodash';
import formFields from './formFields-step-1';
import TagListWizardField from './TagListWizardField';

export default function renderFields() {
    return _.map(formFields, ({ label, name }) => {
        return <Field key={name} label={label} name={name} component={TagListWizardField} type='text' />
    });
}