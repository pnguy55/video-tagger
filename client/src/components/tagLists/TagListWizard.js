// SurveyNew show SurveyForm compnent and SurveyFormReviewComponent
import React, { Component } from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form';
import TagListWizard0 from './TagListWizard0';
import TagListWizard1 from './TagListWizard1';
import TagListWizard2 from './TagListWizard2';
import axios from 'axios';



class TagListWizard extends Component {
    constructor(props){
        super(props);
        this.state = {
            tagListWizardProgress: 0,
            videoList: [],
            videoTitle: '',
            wholeListOfTags: [],
            listOfChosenTags: [],
            listOfChosenTagBubbles: '',
            letterCount: 0
        }

        this.getRelatedVideos = this.getRelatedVideos.bind(this);
        this.getWholeListOfTags = this.getWholeListOfTags.bind(this);
        this.chooseTagFromList = this.chooseTagFromList.bind(this);
    }

    getRelatedVideos(videoTitle){
        let currentComponent = this;

        axios.get(`/api/taglists/gatherVideoList/${videoTitle}`)
        .then(function (videoList) {

            currentComponent.setState({
                videoList
            })

        })
        .catch(function (error) {
            console.log(error);
        })
    }


    getWholeListOfTags(listOfVideoIds){
        let currentComponent = this;

        axios.get(`/api/taglists/gatherTagLists/${listOfVideoIds}`)
        .then(function ({data}) {
            
            let listOfTags = []
            let newData;
            for (let i=0; i<data.length; i++){
                newData = Object.values(data[i])
                listOfTags = [...listOfTags, newData[0], ...newData[1]]
            }

            currentComponent.setState({
                wholeListOfTags: listOfTags
            })

        })
        .catch(function (error) {
            console.log(error);
        })
    }

    chooseTagFromList(chosenTag){
        let currentComponent = this;
        this.setState({
            wholeListOfTags: this.state.wholeListOfTags.filter((tag) => tag !== chosenTag),
            listOfChosenTags: [...this.state.listOfChosenTags, ...this.state.wholeListOfTags.filter((tag) => tag === chosenTag)]
        }, () => {
                let listOfTagBubbles;
                if(currentComponent.state.listOfChosenTags !== undefined){
                    listOfTagBubbles = currentComponent.state.listOfChosenTags.map(tag => {
                        return (
                            <div key={tag} className='soft-outter' style={{display:'flex',marginRight:'2px', flexWrap:'wrap',alignItems:'center',justifyContent:'space-evenly',borderRadius:'20px', padding:'2px 3px',margin:'1px 2px'}}>
                                <div className='soft-inner' style={{padding:'3px'}}>
                                    <div className='flow-text' style={{padding:'2px',borderRadius:'20px', background:'var(--tagBubble)'}}>{tag},</div>
                                </div>
                            </div>
                        )
                    })
                    
                }
                else listOfTagBubbles = '';

                let x = currentComponent.state.listOfChosenTags.toString().replace(/,/g,'');
                x = x.replace(/\s/g,'aaa')
    
                x = x.replace(/[^a-zA-Z]/g, '').length;
        
                this.setState({
                    listOfChosenTagBubbles: listOfTagBubbles,
                    letterCount: x
                }, () => {})
                

        })
    }

    // addTagToList(tagToAdd){
    //     this.setState({
    //         wholeListOfTags: this.state.wholeListOfTags.push(tagToAdd),
            
    //     })
    // }

    renderContent() {
        switch(this.state.tagListWizardProgress){
            case 1:
                return (
                    <TagListWizard1 
                        onCancel={() => this.setState({ tagListWizardProgress: this.state.tagListWizardProgress - 1 })}
                        onSubmit={() => this.setState({ tagListWizardProgress: this.state.tagListWizardProgress + 1 })}
                        getRelatedVideosHandler={this.getRelatedVideos}
                        videoList={this.state.videoList}
                    >

                    </TagListWizard1>);
            case 2: return (
                    <TagListWizard2
                        onCancel={() => this.setState({ tagListWizardProgress: this.state.tagListWizardProgress - 1 })}
                        getWholeListOfTagsHandler={this.getWholeListOfTags}
                        chooseTagFromListHandler={this.chooseTagFromList}
                        wholeListOfTags={this.state.wholeListOfTags}
                        listOfChosenTags={this.state.listOfChosenTags}
                        listOfChosenTagBubbles={this.state.listOfChosenTagBubbles}
                        letterCount={this.state.letterCount}

                    >

                    </TagListWizard2>
            )
            default:
                return (
                    <TagListWizard0 onTagListSubmit={() => this.setState({ tagListWizardProgress: this.state.tagListWizardProgress + 1 })}
                                    
                    >

                    </TagListWizard0>);

        }
    }
    render(){
        return (
            <div className='container'>
                {this.renderContent()}
            </div>
        );
    }
}


export default reduxForm({
    // doing this allows the clearing of values when surveyNew is unmounted (default behavior)
    form: 'tagListWizard'
})(TagListWizard);