import React from 'react'
import reportImage from "../../../../../../assets/SVG/report-generated.svg";
interface props {
  generateReportRef: any,
  closePopUp: () => void
}

export const GenerateReport = (prop: props) => {
  return (
    <div className='confirm-box-report-review' ref={prop.generateReportRef}>
      <div className='success-report-generated-message'>
        <img src={reportImage}/>
        <h2>Reported as Bullying as Harsment</h2>
        <p>We have generated the report the support team will assess the report and send you the next steps</p>
        <button onClick={() => prop.closePopUp()}>Close</button>
      </div>
    </div>
  )
}
