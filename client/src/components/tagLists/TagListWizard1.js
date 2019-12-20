import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields-step-1';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/index';


const TagListWizard1 = ({ onCancel, formValues, submitTagList, history }) => {

    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    })

    return (
        <div>
            <h5>Please confirm your entries</h5>
            <div>
                <div>
                    {reviewFields}
                </div>
            </div>
            <button className="yellow darken-3 btn-flat" onClick={ onCancel }>
                Back
            </button>
            <button onClick={() => submitTagList(formValues, history)} className="green btn-flat right white-text">
                Save Tag List
                <i className="material-icons right">email</i>
            </button>
            
        </div>
    );
};


function mapStateToProps(state) {
    return {
        formValues: state.form.tagListWizard.values
    };
}
// we are using withRouter to redirect
export default connect(mapStateToProps, actions)(withRouter(TagListWizard1));