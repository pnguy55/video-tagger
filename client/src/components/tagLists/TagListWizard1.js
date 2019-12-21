import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields-step-1';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/index';


const TagListWizard1 = ({ onCancel, formValues, submitTagList, history, titleSubmitHandler, videoList }) => {

    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    })


    const generateChoices = _.map(videoList, ({ title, videoId, videoURL, thumbnail, channelTitle }) => {
        return (
            <div className='col s12 m4 l3' key={videoId} style={{display: 'flex', flexDirection: 'column'}}>
                <img src={thumbnail.url} style={{height: 'auto', width: '100%'}} />
                <a href={videoURL} target="_blank">Link to Video</a>
                <label className='row'>
                    <input className='col s12' type="checkbox" value={videoId} />
                    <span className='col s12'>{title}</span>
                </label>
            </div>
        );
    })

    return (
        <div>
            <h5>Based on your title</h5>
            <div>
                <div>
                    {reviewFields}
                </div>
            </div>
            <h6>Which of these videos is most related to yours?</h6>
            <form className='row'>
                {generateChoices}

            </form>
            {console.log(videoList)}

            <button className="yellow darken-3 btn-flat" onClick={ onCancel }>
                Back
            </button>
            <button onClick={() => titleSubmitHandler(formValues['title'])} className="teal btn-flat right white-text">
                Next
                <i className="material-icons right">arrow_forward</i>
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