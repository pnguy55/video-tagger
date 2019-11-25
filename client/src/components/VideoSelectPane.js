import React from 'react';

const VideoSelectPane = props => {
    return (
        <form className="row">
            {props.children}
        </form>
    );
};

export default VideoSelectPane;