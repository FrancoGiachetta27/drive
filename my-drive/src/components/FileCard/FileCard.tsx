import React, { FC } from 'react';
import './FileCard.css';

interface FileCardProps {
    name:string,
    lastUpdate:string
}

const FileCard:FC<FileCardProps> = (props) => {
    console.log(props);
    return (
        <div className='file-card'>
            <div>name: { props.name }</div>
            <div>last update: { props.lastUpdate }</div>
            <div className='buttons'>
                <button>Edit</button>
                <button>Download</button>
            </div>
        </div>
    );
}

export default FileCard;
