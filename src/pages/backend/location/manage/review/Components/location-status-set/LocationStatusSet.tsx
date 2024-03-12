import React from 'react'
import { Button, GhostButton } from '../../../../../../../common/Components/button/Button'
import "./style.css";
import { Location } from '../../../../../../../API';

interface props {
  currentLocation: Location | null
  setShowLocationPause: (data: boolean) => void,
  updateLocation:  (data: boolean) => void
}

export const LocationStatusSet = (prop: props) => {
  return (
    prop.currentLocation?.isPublished ?
    <div className='location-status-modal'>
      <i className="bi bi-pause-circle"></i>
      <h1>Are you sure you want to pause <span>{prop.currentLocation?.name}</span></h1>
      <p>if you continue with this process, your location will be no longer visible to your customers, and will potentially lose it popularity if paused for a longer time.</p>
      <div className='action-modal-button'>
        <GhostButton text={'Close'} loading={false} onClick={() => prop.setShowLocationPause(false)}/>
        <Button text={'Pause Location'} loading={false} onClick={() => prop.updateLocation(false)}/>
      </div>
    </div> : <div className='location-status-modal'>
      <i className="bi bi-play"></i>
      <h1>Are you sure you want to publish <span>{prop.currentLocation?.name}</span></h1>
      <p>if you continue with this process, your location will be visible to your customers, and will potentially gain its popularity over time.</p>
      <div className='action-modal-button'>
        <GhostButton text={'Close'} loading={false} onClick={() => prop.setShowLocationPause(false)}/>
        <Button text={'Publish Location'} loading={false} onClick={() => prop.updateLocation(true)}/>
      </div>
    </div> 
  )
}
