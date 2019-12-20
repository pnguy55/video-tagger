// SurveyNew show SurveyForm compnent and SurveyFormReviewComponent
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import TagListWizard0 from './TagListWizard0';
import TagListWizard1 from './TagListWizard1';


class TagListWizard extends Component {
    state = { tagListWizardProgress: 0 };

    renderContent() {
        switch(this.state.tagListWizardProgress){
            case 1:
                return <TagListWizard1 onCancel={() => this.setState({ tagListWizardProgress: this.state.tagListWizardProgress - 1 })}></TagListWizard1>;
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