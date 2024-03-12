import React, { useContext, useEffect, useState } from 'react'
import "./style.css";
import { DatabaseContext } from '../../../../../setup/context-manager/dbContext';
import { Location } from '../../../../../API';
interface props {
  currentLocation: Location | null,
  setViewStory: (data: boolean) => void
} 
export const ViewStory = (prop: props) => {
  const [videoPath, setVideoPath] = useState<any>();
  const {fetchPublicObject} = useContext(DatabaseContext);

  useEffect(() => {
    getVideo();
  }, [prop.currentLocation]);

  const getVideo = async () => {
    if(prop.currentLocation != null) {
      setVideoPath(`https://viewlive2-storage-2d9b46fd102200-dev.s3.ca-central-1.amazonaws.com/public/${prop.currentLocation?.LiveSnap?.video}`);
    }
  }


  return (
    <div className='story-view-module-box'>
      <div className='top-header-story-view-absolute'>
        <div>
          <h4>Second Location</h4>
        </div>
        <button onClick={() => prop.setViewStory(false)}><i className="bi bi-x"></i></button>
      </div>
      <video autoPlay loop muted src={videoPath}>
        <source src={videoPath} type="video/mp4" />
      </video>
    </div>
  )
}
