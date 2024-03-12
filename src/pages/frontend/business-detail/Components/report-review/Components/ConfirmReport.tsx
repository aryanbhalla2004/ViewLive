import React from 'react'

interface props {
  confirmReportRef: any,
  typeOfReport: string,
  scrollToReportType: () => void,
  createReport: () => void
}
export const ConfirmReport = (prop: props) => {
  return (
    <div className='confirm-box-report-review' ref={prop.confirmReportRef}>
      <div className='confirm-header-2-page'>
        <button onClick={() => prop.scrollToReportType()}><i className="bi bi-chevron-left"></i></button>
        <h2>Confirm Report Review</h2>
        <p>The purpose of this confirmation is to acknowledge the report and assure the reporter that it is being taken seriously. The investigation will determine the validity of the reported issue and appropriate actions will be taken accordingly.</p>
      </div>
      <div className='review-previw-for-report'>
        <div className='review-info-box-report'>
          <h3>Aryan Bhalla</h3>
          <p>Jan 23, 2022</p>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate necessitatibus quaerat voluptatibus iure, suscipit quos blanditiis dolorum optio perspiciatis dolore nam. Animi beatae commodi quod, error neque omnis cumque consequuntur?</p>
      </div>
      <button className='confirm-button-report' onClick={prop.createReport}>Report as {prop.typeOfReport}</button>
    </div>
  )
}
