import React from 'react'

export const BSetting = () => {
  return (
    <div className='single-col-management-bb'>
      <h3>Deletion</h3>
      <div className='inputs-holder-below-title-bb location-management-setting-delete'>
        <h3>Delete Business <span className='highlight danger-highlight'>Critical Action</span></h3>
        <p>Moving forward with this action will result in the deletion of all location-based data from our platform, encompassing not only email addresses and cached data but also live reviews and pictures associated with these locations.</p>

        <div className='action-delete-location'>
          <button>Delete Permanently</button>
        </div>
      </div>
    </div>
  )
}
