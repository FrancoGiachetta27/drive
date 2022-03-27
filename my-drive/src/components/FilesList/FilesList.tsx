import React, { FC, useEffect, useState } from 'react';
import './FilesList.css';
import FileCard from '../FileCard/FileCard';

interface File {
    name:string,
    updated:string
}

function FilesList() {
    const [files,setFiles] = useState<Array<File>>();

    useEffect(() => {
        fetch('http://localhost:8000/files')
        .then(res => { return res.json() })
        .then(data => { setFiles(data) });
    },[]);

    return (
        <div className='files-list'>
            {files &&
                files.map((data:File) => (
                    <FileCard name={data.name} lastUpdate={data.updated} />
                ))
            }
       </div>
    );
}

export default FilesList
