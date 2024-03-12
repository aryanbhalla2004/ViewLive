import React from 'react'

interface props {
  setReportReview: (show: boolean) => void,
  typeOfReportRef: any,
  scrollToConfirm: () => void,
  setTypeOfReport: (data: string) => void
}

export const TypeOfReport = (prop: props) => {

  const onSelect = (type: string) => {
    prop.setTypeOfReport(type);
    prop.scrollToConfirm()
  }
  return (
    <div className='report-review-box' ref={prop.typeOfReportRef}>
      <div className='header-report-start'>
        <h2>Report Review</h2>
        <button onClick={() => prop.setReportReview(false)}><i className="bi bi-x-lg"></i></button>
      </div>
      <ul>
        <li onClick={() => onSelect("Off Topic")}>
          <div className='left-side-reason'>
            <h4>Off Topic</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit delectus quam aliquid in</p>
          </div>
          <button>
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>
        <li onClick={() => onSelect("Spam")}>
          <div className='left-side-reason'>
            <h4>Spam</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit delectus quam aliquid in</p>
          </div>
          <button>
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>
        <li onClick={() => onSelect("Conflict of interest")}>
          <div className='left-side-reason'>
            <h4>Conflict of interest</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit delectus quam aliquid in</p>
          </div>
          <button>
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>
        <li onClick={() => onSelect("Profanity")}>
          <div className='left-side-reason'>
            <h4>Profanity</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit delectus quam aliquid in</p>
          </div>
          <button>
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>
        <li onClick={() => onSelect("Discrimination or hate speech")}>
          <div className='left-side-reason'>
            <h4>Discrimination or hate speech</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit delectus quam aliquid in</p>
          </div>
          <button>
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>
        <li onClick={() => onSelect("Bullying or harassment")}>
          <div className='left-side-reason'>
            <h4>Bullying or harassment</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit delectus quam aliquid in</p>
          </div>
          <button>
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </div>
  )
}
