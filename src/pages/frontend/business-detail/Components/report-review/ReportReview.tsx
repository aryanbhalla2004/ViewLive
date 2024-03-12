import React, { useContext, useEffect, useState } from 'react'
import "./style.css";
import { TypeOfReport } from './Components/TypeOfReport';
import { ConfirmReport } from './Components/ConfirmReport';
import { GenerateReport } from './Components/GenerateReport';
import { CreateReportReviewInput } from '../../../../../API';
import { DatabaseContext } from '../../../../../setup/context-manager/dbContext';
import { createReportReview } from '../../../../../graphql/mutations';

interface props {
  setReportReview: (show: boolean) => void,
  reportReviewId: any,
  reportReview: boolean
}

export const ReportReview = (prop: props) => {
  const [typeOfReport, setTypeOfReport] = useState<string>("");
  const {pushDataUser} = useContext(DatabaseContext);
  const horScrollEffectRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(prop.reportReview === false) {
      scrollToElement(typeOfReportRef);
    }
  }, [prop.reportReview]);

  const scrollToElement = (ref: any) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const typeOfReportRef = React.useRef(null);
  const confirmReportRef = React.useRef(null);
  const generateReportRef = React.useRef(null);

  const scrollToConfirm = () => {
    scrollToElement(confirmReportRef);
  }

  const scrollToReportType = () => {
    scrollToElement(typeOfReportRef);
  }

  const createReport = async () => {
    const report:CreateReportReviewInput = {
      reason: typeOfReport,
      reviewID: prop.reportReviewId,
    }

   
    //console.log(report);

    try {
      //const sending = await pushDataUser(createReportReview, report);
      //console.log(sending);
      scrollToElement(generateReportRef);
    } catch(e) {
      console.log(e);
    }

  }

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
    };

    const divElement = horScrollEffectRef.current;
    if (divElement) {
      divElement.addEventListener('wheel', handleScroll, { passive: false });

      return () => {
        divElement.removeEventListener('wheel', handleScroll);
      };
    }
  }, []);

  const closePopUp = () => {
    prop.setReportReview(false);   
  }

  return (
    <div className='hor-scroll-effect' ref={horScrollEffectRef}>
      <TypeOfReport setReportReview={prop.setReportReview} scrollToConfirm={scrollToConfirm} setTypeOfReport={setTypeOfReport} typeOfReportRef={typeOfReportRef}/>
      <ConfirmReport confirmReportRef={confirmReportRef} typeOfReport={typeOfReport} scrollToReportType={scrollToReportType} createReport={createReport}/>
      <GenerateReport closePopUp={closePopUp} generateReportRef={generateReportRef}/>
    </div>
  )
}
