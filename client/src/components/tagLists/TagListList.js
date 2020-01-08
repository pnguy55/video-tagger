import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTagLists, deleteTagList } from '../../actions';

class TagListList extends Component {

    componentDidMount() {
        this.props.fetchTagLists();

    }

    renderTagListList() {
        let i=0;
        return this.props.tagLists.reverse().map(tagList => {
            return (
                <div key={i++} id='card-list' className='container'>
                    <div className='row soft-outter'>
                        <div className="col s12 soft-inner card" key={tagList._id}>
                            <div className="card-content">
                                <h5 className="card-title">{tagList.title}</h5>
                                <div className='max-width'>{tagList.tags.map((tag)=>{
                                    return(
                                        <div key={tag} className='soft-outter tag-bubble-wrap' style={{}}>
                                            <div className='soft-inner'>
                                                <div className='flow-text chosen tag-bubble' style={{}}>{tag},</div>
                                            </div>
                                        </div>
                                    );
                                })}</div>
                                <p className="right">
                                    Date Created: {new Date(tagList.dateCreated).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="card-action flex-right">
                                <div className="btn red darken-4" onClick={() => {this.props.deleteTagList(tagList._id);this.props.fetchTagLists();}}> Delete Tag List?</div>
                            </div>
                        </div>
                    </div>
                    <div className='row max-width'>
                            <div className='divider'></div>
                    </div>
                </div>
            );
        });
    }
    render() {
        return (
            <div className='flex-column'>
                <h4 style={{fontWeight:'800', textAlign:'center'}}>Your Saved Lists</h4>
                <Link to='/' className="btn btn-large" style={{background:'var(--secondary)'}}>
                    Add a New List
                </Link>
                <div style={{marginTop:'1rem'}}>{this.renderTagListList()}</div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    // we declared the state piece's name in auth reducer
    return { 
        tagLists: [...state.tagLists]
    }
}

export default connect(mapStateToProps, { fetchTagLists, deleteTagList })(TagListList);