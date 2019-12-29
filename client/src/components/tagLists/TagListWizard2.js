import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import formFields from './formFields-step-1';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/index';


const TagListWizard2 = ({ onCancel, formValues, submitTagList, history, getWholeListOfTagsHandler, wholeListOfTags, letterCount }) => {

    const [tags, setTags] = useState([]);

    useEffect(() => {

        let videoIdList = Object.keys(formValues);
        let videoIdValues = Object.values(formValues);
        let videoIdListLength = videoIdList.length;

        videoIdList.splice(0,1);
        videoIdValues.splice(0,1);



        for(let i=0; i< videoIdListLength; i++){
            if(!videoIdValues[i]){
                videoIdList[i] = '';
            }
        }

        getWholeListOfTagsHandler(videoIdList.filter((videoId) => {return videoId !== ''}).join('+').toString())
        
    }, [formValues]);


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
                    <button style={{height:'2rem', display:'flex', alignItems:'center', justifyContent:'space-evenly'}} onClick={() => getWholeListOfTagsHandler(formValues['title'])} className="soft-inner right black-text">
                        Next
                        <i className="material-icons">arrow_forward</i>
                    </button>
                </div>
            </div>
        )
    }

    // const tagLister = (wholeListOfTags) => {
    //     const listOfTags = _.map(wholeListOfTags, ({channelTitle, tags}) => {
    //         return `${channelTitle}, ${tags.join(',')}`
    //     });

    //     return listOfTags.join(', ')
    // }

    // const letterCounter = (x) => {
    //     x = x.replace(/\s/g,'aaa')
    //     return x.replace(/[^a-zA-Z]/g, '').length;
    // }


    const tagBubbler = (listOfTags) => {
        const listOfTagBubbles = listOfTags.map(tag => {
            return (
                <div key={tag} className='soft-outter' style={{display:'flex',marginRight:'2px', flexWrap:'wrap',alignItems:'center',justifyContent:'space-evenly',borderRadius:'20px', padding:'2px 3px',margin:'1px 2px'}}>
                    <div className='soft-inner' style={{padding:'3px'}}>
                        <div className='flow-text' style={{padding:'2px',borderRadius:'20px', background:'var(--tagBubble)'}}>{tag}</div>
                    </div>
                </div>
            )
        })
        return listOfTagBubbles;

    }
  

    return (
        <div className='container'>
            <h5 className='col s12 m6 offset-m3 l4 offset-l4'>Based on your title</h5>
            <div>
                <div>
                    {reviewFields}
                </div>
            </div>
            <h5 style={{fontWeight: '800'}}>Choose the tags most relevant to yours.</h5>
            
            <form className='row'>

                <p className="flow-text">{letterCount}</p>
                {console.log(wholeListOfTags)}
                
                <div style={{display:'flex',flexWrap:'wrap', width:'100%'}} className="flow-text">{tagBubbler(wholeListOfTags)}</div>

                <p>{tags}</p>
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
export default connect(mapStateToProps, actions)(withRouter(TagListWizard2));