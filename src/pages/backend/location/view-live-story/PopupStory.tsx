import React, { useContext, useEffect, useState, ChangeEvent } from 'react'
import { DatabaseContext } from '../../../../setup/context-manager/dbContext';
import "./style.css";
import { createLiveSnap, deleteLiveSnap, updateLocation } from '../../../../graphql/mutations';
import { CreateLiveSnapInput, Location, UpdateLocationInput } from '../../../../API';
import { toast } from 'react-toastify';
import Select from 'react-select/dist/declarations/src/Select';
import Loading from '../../../../common/Components/pre-loader/Loading';
interface prop {
  postStoryData: Location | null,
  setPostStoryData: (data: any) => void,
  pullLocation: () => void,
}
export const PopupStory = (props: prop) => {
  const [viewFile, setViewFile] = useState<File | null>(null);
  const {pushDataUser, updateLocationFunction, uploadFile} = useContext(DatabaseContext);
  const [error, setError] = useState<String>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
 
  const generateExpirationTime = ():number =>  {
    const currentTime = new Date();
    // Add 24 hours to the current time
    const newTime = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000);
    // Get the timestamp in milliseconds
    const timeParsed = newTime.getTime().toString().slice(0, -3);

    return parseInt(timeParsed);
  }

  const onSubmit = async () => {
    setError("");
    try {
      if(props.postStoryData != null && viewFile != null) {
        const arrayNameFile = viewFile?.name.split('.');
        if(arrayNameFile != undefined) {
          setSubmitted(true);
          const extension = arrayNameFile[arrayNameFile?.length - 1];
          const videoPath = await uploadFile(`${props.postStoryData.id}/story/dailyVideo.${extension}`,viewFile,"public");

          const ViewLiveSnap : CreateLiveSnapInput = {
            id: props.postStoryData.id,
            video: videoPath,
            expirationUnixTime: generateExpirationTime()
          }

          const locationUpdate: UpdateLocationInput = {
            id: props.postStoryData.id,
            locationLiveSnapId: props.postStoryData.id,
          };

          
          const response = await pushDataUser(createLiveSnap, ViewLiveSnap);
          console.log(response);
          const updateDataBase = await updateLocationFunction(updateLocation, locationUpdate);
          console.log(updateDataBase); 

          await toast.success(`Story for ${props.postStoryData.name} was posted successfully`);
          props.pullLocation()
          props.setPostStoryData(null);
          setSubmitted(false);
        }
      } else {
        setError("Please make sure to select a file")
      }
    } catch (e) {
      console.log(e);
    }
    
  }

  const deleteStory = async () => {
    try {
      setSubmitted(true);
      const response = await pushDataUser(deleteLiveSnap, {id: props.postStoryData?.LiveSnap?.id});
      setSubmitted(false);
      await toast.success(`Story for ${props.postStoryData?.name} was deleted successfully`);
      props.pullLocation()
      props.setPostStoryData(null);
    } catch(e) {
      console.log(e);
      setSubmitted(false);
    }
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setViewFile(null);
    setError("");
    const file = event.target.files && event.target.files[0];

    if (file && file.type.startsWith('video/')) {
      try {
        const duration = await getVideoDuration(file);
        if(duration <= 30) {
          setViewFile(file);
        } else {
          setError("The video is too long, try uploading a video under 30 seconds")
          event.target.value = "";
        }
      } catch (error) {
        console.error(error);
      }
      
    } else {
      console.log('Invalid file type. Please select a video file.');
    }
  };

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const videoElement = document.createElement('video');
      videoElement.preload = 'metadata';
  
      videoElement.onloadedmetadata = () => {
        resolve(videoElement.duration);
        URL.revokeObjectURL(videoElement.src);
      };
  
      videoElement.onerror = () => {
        reject(new Error('Unable to retrieve video duration.'));
        URL.revokeObjectURL(videoElement.src);
      };
  
      videoElement.src = URL.createObjectURL(file);
    });
  }

  return (
    props.postStoryData?.LiveSnap === null ? <>
      <div className='pop-up-location-story-upload-container'>
        <h2>Upload Your Daily Story</h2>
        <p>This video will be shared with people all across the platform. Make sure the video is quick and short!</p>
        <div className='upload-container-viewlive'>
          
          <i className="bi bi-file-earmark-play-fill mb-3"></i>
          <p>{viewFile ? viewFile.name : "Upload Video File"}</p>
          
          <div>
            <input accept="video/*" name="viewLive" onChange={handleFileChange} id="upload" type="file"  hidden/>
            <label htmlFor="upload">{viewFile ? <> Change file <i className="bi bi-x"></i></> : <><i className="bi bi-upload"></i> Choose file</> }</label>
          </div>
          
        </div>
        {error && <div className='error-message'><i className="bi bi-exclamation-triangle"></i> {error}</div>}
        <div className='action-button-flex'>
          <button onClick={() => props.setPostStoryData(null)} className='btn close-button-story-pop'>Close</button>
          <button onClick={onSubmit} className='btn prim-submit-button btn-primary'>Upload</button>
        </div>
        {submitted && <div className='over-lay-loading-box'><Loading/></div>}
      </div>
    </> : 
    <>
      <div className='pop-up-location-story-upload-container'>
        <h2>Delete Posted Story</h2>
        <p>Are you certain about deleting your story? Please note that deleting your story will result in the loss of all the associated analytical data.</p>
        {/* <div className='upload-container-viewlive'>
          <i className="bi bi-cloud-arrow-up-fill"></i>
          <p>Click to Upload</p>
          <input accept="video/*" name="viewLive" onChange={handleFileChange} type="file" />
        </div> */}
        <div className='action-button-flex'>
          <button onClick={() => props.setPostStoryData(null)} className='btn close-button-story-pop'>Close</button>
          <button onClick={deleteStory} className='btn danger-button'><i className="bi bi-trash3"></i>Delete Story</button>
        </div>
        {submitted && <div className='over-lay-loading-box'></div>}
      </div>
    </>
  )
};