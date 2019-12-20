import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTagLists, deleteTagList } from '../../actions';

class TagListList extends Component {

    componentDidMount() {
        this.props.fetchTagLists();
    }

    componentDidUpdate() {
        this.props.fetchTagLists();
    }

    renderTagListList() {
        return this.props.tagLists.reverse().map(tagList => {
            return (
                <div className="card blue-grey darken-1" key={tagList._id}>
                    <div className="card-content white-text">
                        <span className="card-title">{tagList.title}</span>
                        <p>{tagList.tags}</p>
                        <p className="right">
                            Date Created: {new Date(tagList.dateCreated).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <div className="btn red" onClick={() => this.props.deleteTagList(tagList._id)}> Delete Tag List?</div>
                    </div>
                </div>
            );
        });
    }
    render() {
        return (
            <div>
                {this.renderTagListList()}
            </div>
        )
    }

}

function mapStateToProps(state) {
    // we declared the state piece's name in auth reducer
    return { 
        tagLists: state.tagLists
    }
}

export default connect(mapStateToProps, { fetchTagLists, deleteTagList })(TagListList);