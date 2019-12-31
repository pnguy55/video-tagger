import React from 'react';
import { Link } from 'react-router-dom';
import TagListList from './tagLists/TagListList';

const Dashboard = () => {
    return (
        <div>
            <TagListList/>
            <div className="fixed-action-btn" style={{marginRight: '6rem'}}>
                <Link to='/' className="btn-floating btn-large" style={{background:'var(--greenDark)'}}>
                    <i  className="material-icons">add</i>
                </Link>
            </div>
        </div>
    )
}

export default Dashboard;