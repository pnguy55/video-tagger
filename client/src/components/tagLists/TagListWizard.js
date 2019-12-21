// SurveyNew show SurveyForm compnent and SurveyFormReviewComponent
import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm } from 'redux-form';
import TagListWizard0 from './TagListWizard0';
import TagListWizard1 from './TagListWizard1';
import axios from 'axios';


class TagListWizard extends Component {
    constructor(props){
        super(props);
        this.state = {
            tagListWizardProgress: 0,
            videoList: []
        }

        this.getRelatedVideos = this.getRelatedVideos.bind(this);
    }

    getRelatedVideos(videoTitle){
        let currentComponent = this;

        axios.get(`https://www.googleapis.com/youtube/v3/search?maxResults=12&part=snippet&order=viewCount&q=${videoTitle}+&type=video+&videoDefinition=high&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        .then(function (res) {
            const { items } = res.data;
            const videoList = _.map(items, ({snippet, id }) => {
                return ({
                    title: snippet.title,
                    videoId: id.videoId,
                    videoURL: `https://www.youtube.com/watch?v=${id.videoId}`,
                    thumbnail: snippet.thumbnails.default,
                    channelTitle: snippet.channelTitle
                });
            })
            currentComponent.setState({
                videoList
            })

        })
        .catch(function (error) {
            console.log(error);
        })
    }

    renderContent() {
        switch(this.state.tagListWizardProgress){
            case 1:
                return <TagListWizard1 
                        onCancel={() => this.setState({ tagListWizardProgress: this.state.tagListWizardProgress - 1 })}
                        titleSubmitHandler={this.getRelatedVideos}
                        videoList={this.state.videoList}
                        >

                        </TagListWizard1>;
            default:
                return <TagListWizard0 onTagListSubmit={() => this.setState({ tagListWizardProgress: this.state.tagListWizardProgress + 1 })}></TagListWizard0>;

        }
    }
    render(){
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    // doing this allows the clearing of values when surveyNew is unmounted (default behavior)
    form: 'tagListWizard'
})(TagListWizard);