import React from 'react';
import VideoChoice from './VideoChoice';
import VideoSelectPane from './VideoSelectPane';
import axios from 'axios';


const Landing = () => {
    return (
        <div style={{textAlign: 'center'}}>
            <div className='row'>
                <img className="col s6 m4 offset-s3 offset-m4" src="https://composeclick.com/wp-content/uploads/2019/01/Untitled-design.jpg" />
            </div>
            <div className="row">
                <div className="input-field col s12 m6 offset-m3">
                    <input style={{ fontSize: '2rem' }} id="input_text" type="text" data-length="12" placeholder='What is your video about?'></input>
                </div>
            </div>
            <div className='btn-floating btn-large waves-effect waves-light red darken-3'>Start Tagging</div>
            <VideoSelectPane>
                <VideoChoice videoNumber={0} />
                <VideoChoice videoNumber={1} />
                <VideoChoice videoNumber={2} />
                <VideoChoice videoNumber={3} />
            </VideoSelectPane>
        </div>
    );
};

export default Landing;