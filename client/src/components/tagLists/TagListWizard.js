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
            listOfRemovedTags: [],
            letterCount: 0
        }

        this.getRelatedVideos = this.getRelatedVideos.bind(this);
        this.getWholeListOfTags = this.getWholeListOfTags.bind(this);
        this.removeTagFromList = this.removeTagFromList.bind(this);
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

            let x = listOfTags.toString().replace(/,/g,'');
            x = x.replace(/\s/g,'aaa')

            x = x.replace(/[^a-zA-Z]/g, '').length;

            currentComponent.setState({
                wholeListOfTags: listOfTags,
                letterCount: x
            })

        })
        .catch(function (error) {
            console.log(error);
        })
    }

    removeTagFromList(tagToRemove){
        this.setState({
            wholeListOfTags: this.state.wholeListOfTags.filter((tag) => {tag !== tagToRemove}),
            listOfRemovedTags: this.state.wholeListOfTags.filter((tag) => {tag === tagToRemove})
        })
    }

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
                        removeTagFromListHandler={this.removeTagFromList}
                        wholeListOfTags={this.state.wholeListOfTags}
                        listOfRemovedTags={this.listOfRemovedTags}
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