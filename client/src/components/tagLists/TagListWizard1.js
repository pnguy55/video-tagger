import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import formFields from './formFields-step-1';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/index';


const TagListWizard1 = ({ onCancel, formValues, submitTagList, history, getRelatedVideosHandler, videoList }) => {

    useEffect(() => {
        getRelatedVideosHandler(formValues['title'])
    }, [formValues['title']]);

    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name}>
                <div className='flow-text' style={{fontSize: '4rem'}}>"{formValues[name]}"</div>
            </div>
        );
    })

    const form_buttons = () => {
        return(
            <div className='row'>
                <div className='soft-outter btn-wrapper col s5 offset-s1 m4 offset-m1 l3 offset-l2'>
                    <button style={{height:'2rem', display:'flex', alignItems:'center', justifyContent:'space-evenly'}} className="soft-inner black-text darken-3 right" onClick={ onCancel }>
                        Back
                    </button>
                </div>
                <div className='soft-outter btn-wrapper col s5 offset-s1 m4 offset-m3 l3 offset-l2'>
                    <button style={{height:'2rem', display:'flex', alignItems:'center', justifyContent:'space-evenly'}} onClick={() => getRelatedVideosHandler(formValues['title'])} className="soft-inner right black-text">
                        Next
                        <i className="material-icons">arrow_forward</i>
                    </button>
                </div>
            </div>
        )
    }

    const generateChoices = _.map(videoList.data, ({ title, videoId, videoURL, thumbnail, channelTitle, channelURL }) => {
        return (
            <div key={videoId} className='soft-outter col s12 m5 l5 offset-m1 offset-l1' style={{padding: '0px'}}>
                <div className='soft-outter card' style={{backgroundColor: "var(--softBackground)", width: '100%', height: '100%'}}>
                    <div className='card card-image' key={videoId} style={{display: 'flex', flexDirection: 'column'}}>
                        <img src={thumbnail.url} style={{height: 'auto', width: '100%'}} />
                        <a href={channelURL} target="_blank" className='card-title black white-text' style={{padding:'5px', fontSize:'1rem'}}>{channelTitle}<i className='material-icons right'>open_in_new</i></a>
                    </div>
                    <div className='card-content container' style={{padding:'0px 3px'}}>
                        <a className='row btn red darken-4' href={videoURL} style={{}} target="_blank">Link to Video<i className='material-icons right'>open_in_new</i></a>
                        <label className='row card-checkbox'>
                            <input className='col s12' type="checkbox" value={videoId} />
                            <span className='col s12'>{title}</span>
                        </label>
                    </div>
                </div>
            </div>
        );
    })
    
    

    return (
        <div className='container'>
            <h5 className='col s12 m6 offset-m3 l4 offset-l4'>Based on your title</h5>
            <div>
                <div>
                    {reviewFields}
                </div>
            </div>
            <h5 style={{fontWeight: '800'}}>Which of these videos is most related to yours?</h5>
            
            <form className='row'>
                {videoList.data!==[''] ? generateChoices : console.log('no videos')}
                
                <div className='container'>{form_buttons()}</div>
            </form>
            
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