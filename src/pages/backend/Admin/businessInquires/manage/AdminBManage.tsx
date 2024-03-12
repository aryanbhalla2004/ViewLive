import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet, Route, Routes, useParams, useNavigate  } from 'react-router-dom';
import "./style.css";
import {getBusiness, getUser as getUserDB} from "../../../../../graphql/queries"
import { API } from 'aws-amplify';
import { AccountContext } from '../../../../../setup/context-manager/AuthContext';
import { DatabaseContext } from '../../../../../setup/context-manager/dbContext';
import {updateBusiness} from "../../../../../graphql/mutations";
import { Business, Status, UpdateBusinessInput, User } from '../../../../../API';
import { TextAreaInput } from '../../../../../common/Components/textInput/TextInput';
import { ModualPop } from '../../../../../common/Components/module-pop/ModualPop';
import { DecisionBox } from '../../components/decision-box/DecisionBox';

interface OutletProps {
  context?: unknown;
}

const AdminBManage = () => {
  const navigate = useNavigate();
  const {pullObj, pushDataUser, fetchProtectedObject, updateBusinessFunction} = useContext(DatabaseContext);
  const {getUser} = useContext(AccountContext);
  const { id } = useParams();

  const [data,setData] = useState<Business | null>(null);
  const [showBox, setShowBox] = useState<boolean>(false);
  const [boxType, setBoxType] = useState<String>("");
  const [allFile, setAllFile] = useState<any>([]);

  useEffect(() => { 
    pull();
  }, []);

  const pull = async () => {
    const response = await pullObj(getBusiness, id);
    const business : Business = response?.data.getBusiness;
    if(business.status === Status.WAITING) {
      setData(business);
    } else {
      navigate("/dashboard/admin/business-inquires");
    }
  }

  useEffect(() => {
    pullFilesForBusiness();
  }, [data]);

  const pullFilesForBusiness = async() => {
    if(data === null) {
      return
    }

    const tempAllFile = [];
   
    for(let i = 0; i < data?.documents.length; i++) {
      const file = await fetchProtectedObject(data?.documents[i].document, data?.identityId);
      const fileObj:any = {
        link: file,
        type: data?.documents[i].documentType
      }
      
      tempAllFile.push(fileObj);
    }

    setAllFile(tempAllFile);
  }


  const changeStatus = async (status:Status, reason?: string) => {
    if(data != undefined) {

      const businessDetails: UpdateBusinessInput = {
        id: data.id,
        status: status,
      };
      
      try {
        const updateDataBase = await updateBusinessFunction(updateBusiness, businessDetails);
        const response = await pullObj(getUserDB, data?.cognitoUser);
        const businessOwner:User = response.data.getUser; 
        const emailData = await getEmailData(businessOwner, data, status, reason);
        await handleSubmit(emailData);
        // if(status === Status.APPROVED) {
        //   const approveBusiness : CreateApprovedBusinessInput = {
        //     approvedBusinessBusinessId: data.id
        //   }

        //   const response = await pushDataUser(createApprovedBusiness, approveBusiness);
        //   console.log(response);
        // }

        return 200;

      } catch (e) {
        console.log("dartaasd waiting");
        return 404;
      }
      

    } else {
      console.log("dartaasd waiting");
      return 404;
    }
    
  }

  const handleSubmit = async (message: String) => {
    const user = getUser();
    // //console.log(user.signInUserSession.accessToken.jwtToken);
    const itm = await fetch("https://gxkhme3q0h.execute-api.ca-central-1.amazonaws.com/test",
      {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': user.signInUserSession.idToken.jwtToken,
        },
        body: JSON.stringify({
          senderName: "awsviewlivetest@gmail.com",//from
          senderEmail: "aryanbhalla66@gmail.com",
          message: message,
          base64Data: "",
          date: "View.live Business Application Status Update",
        }),
        
    });
    console.log(itm);
  }
    
  const showDecisionBox = (value: string) => {
    setShowBox(true);
    setBoxType(value);
  }

 
  return (
    <>
    <div className='bbView-container'>
      <div className='dash-header-page'>
        <div className='name-path-dash-page'>
          <h2>{data?.name}</h2>
          <p className='path-style'>Dashboard <i className="bi bi-chevron-right"></i> Business <i className="bi bi-chevron-right"></i> Manage</p>
        </div>
        <div className='action-button-container-dash'>
          <Link to="/dashboard/admin/business-inquires" className='link-button btn-primary'><i className="bi bi-arrow-left"></i> Cancel</Link>
          <button onClick={() => showDecisionBox("APPROVE")} className='link-button approve-button'>Approve Business</button>
          <button onClick={() => showDecisionBox("DECLINE")} className='link-button reject-button'>Reject Business</button>
        </div>
      </div>
      <div className='manage-bb-content-box'>
        <div className='page-content-for-managing'>
          <Outlet context={[data, allFile]}/>
        </div>
      </div>
    </div>
    <ModualPop show={showBox} child={<DecisionBox boxType={boxType} changeStatus={changeStatus} setShowBox={setShowBox}/>}/>
    </>
  )
}

const getEmailData = (user: User, data: Business, accept: Status, reason?: string) : String => {
  const message = `<!DOCTYPE html>
    <html>
    <head>
      <style>
        /* CSS styles */
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
          padding: 20px;
        }
        
        .container {
          background-color: #fff;
          border-radius: 10px;
          padding: 20px;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
          color: #333;
          text-align: center;
        }
        
        p {
          margin-bottom: 20px;
        }
        
        .button {
          display: inline-block;
          background-color: #4CAF50;
          color: #fff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
        }
        
        .button:hover {
          background-color: #45a049;
        }

        .footer-remove-gap {
          gap: 15px;
        }

        .footer-remove-gap > p {
          margin: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Congratulations! Your Business Application Approved</h1>
        <p>Dear ${user.givenName} ${user.familyName},</p>
        
        <p>We are thrilled to inform you that your business application has been approved! Congratulations on taking this significant step towards expanding your reach and connecting with new customers. We are excited to have you on board.</p>
        
        <p>At View.Live, we believe in fostering a vibrant and diverse community of businesses, and we are confident that your unique offerings will contribute to the richness of our platform. Your dedication, passion, and commitment to delivering exceptional services have impressed us, and we are excited to support your growth journey.</p>
        
        <p>Now that your application has been approved, you can start posting your locations and reaching out to potential customers right away. Our platform provides you with a powerful and user-friendly interface to showcase your business and connect with individuals seeking your services.</p>
        
        <p>Here are a few steps to get started:</p>
        <ol>
          <li>Log in to your <b>${data?.name}</b> account using your registered email and password.</li>
          <li>Navigate to the "Manage Locations" section in your dashboard.</li>
          <li>Click on the "Add New Location" button to input the details of your business location, including its name, address, contact information, and any other relevant information.</li>
          <li>Upload high-quality images that highlight the uniqueness of your business and create an enticing visual experience for your potential customers.</li>
          <li>Add a captivating description that showcases your offerings, expertise, and what sets your business apart.</li>
          <li>Don't forget to include your operating hours, pricing information, and any special promotions or discounts you may offer.</li>
        </ol>
        
        <p>Remember, your success is our success! To maximize your visibility and attract more customers, consider utilizing our promotional tools, such as featured listings and targeted advertisements. Our dedicated support team is always available to provide guidance and assist you with any queries you may have along the way.</p>
        
        <p>We are confident that your business will thrive on our platform, and we are excited to witness your achievements. Keep in mind that as you grow, we are here to support you with additional resources, marketing opportunities, and insights to help you reach new heights.</p>
        
        <p>Once again, congratulations on your approval! We are honored to have you as part of our community. If you have any questions or need further assistance, please feel free to reach out to our support team at [email address or phone number].</p>
        
        <p>Wishing you all the best on your business journey!</p>
        <p>Warm regards,</p>
        <div class="footer-remove-gap">
          <p>Support Team</p>
          <p>View.Live</p>
        </div>
      </div>
    </body>
    </html>
    `;

    const reject = `<!DOCTYPE html>
    <html>
    <head>
      <style>
        /* CSS styles */
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
          padding: 20px;
        }
        
        .container {
          background-color: #fff;
          border-radius: 10px;
          padding: 20px;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
          color: #333;
          text-align: center;
        }
        
        p {
          margin-bottom: 20px;
        }
        
        .button {
          display: inline-block;
          background-color: #4CAF50;
          color: #fff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
        }
        
        .button:hover {
          background-color: #45a049;
        }

        .footer-remove-gap {
          gap: 15px;
        }

        .footer-remove-gap > p {
          margin: 5px;
        }

        .Reject-reasoning {
          border: 1px solid #dc3545;
          border-radius: 4px;
          background-color: #fbecee;
          padding: 20px;
        }

        .Reject-reasoning > h4 {
          margin: 0;
          font-size: .9rem;
          font-weight: 200;
        }

        .Reject-reasoning > ul {
          padding-left: 20px;
          margin-bottom: 5px;
        }

        .Reject-reasoning > ul > li {
          font-weight: 300;
          padding-left: 10px;
          line-height: 20px;
          font-size: .9rem;
        }
      

      </style>
    </head>
    <body>
      <div class="container">
        <h1>Important Update: Business Application Status and Next Steps</h1>
        <p>Dear ${user.givenName} ${user.familyName},</p>
        
        <p>We hope this email finds you well. We appreciate the time and effort you invested in submitting your business application to View.live. We have carefully reviewed your application, and while we recognize your enthusiasm and dedication, we regret to inform you that your application has been rejected at this time.</p>
        
        <p>Please understand that our decision was not taken lightly, and we want to provide you with constructive feedback to help you understand the reasons behind the rejection. The following are the main factors that influenced our decision:</p>
        
        <div class="Reject-reasoning">
          <h4>Reason of Rejection</h4>
          <ul>
            <li>${reason}</li>
          </ul>
        </div> 
        
        <p>We understand that this may be disappointing news, but we encourage you to view it as an opportunity to reevaluate and make the necessary adjustments to enhance your chances of future success. We genuinely believe in the potential of your business and would like to assist you in improving your application.</p>
        
        <p>To help you in this process, we recommend the following steps:</p>
        
        <ol>
          <li><strong>Review and Address the Feedback</strong>: Take some time to thoroughly review the feedback provided in this email. Carefully assess the areas that need improvement and make the necessary adjustments to your business concept, offerings, or application details accordingly.</li>
          <li><strong>Visit the Business Pages</strong>: Explore the businesses currently listed on our platform that are similar to yours. Observe the successful ones to gain insights into their presentation, messaging, and approach. Use this knowledge to refine your business plan and tailor it to align more closely with our platform's standards and expectations.</li>
          <li><strong>Update and Enhance Your Application</strong>: Once you have made the necessary changes to your business concept, offerings, and application details, we invite you to revisit our website and update your application accordingly. Ensure that all the requested information is complete, accurate, and clearly demonstrates the value and uniqueness of your business.</li>
          <li><strong>Submit a New Inquiry</strong>: After updating your application, submit a new inquiry through our online platform. This will enable our team to reevaluate your revised application and consider it for future inclusion on our platform. We encourage you to leverage the feedback received to strengthen your case and showcase the improvements you have made.</li>
        </ol>
        
        <p>Please note that our decision to reject your application does not reflect a lack of potential or value in your business concept. We receive numerous applications and strive to maintain a balance between quality and relevance within our community.</p>
        
        <p>We genuinely appreciate your interest in joining our platform, and we encourage you to persevere in refining your business. We are here to support you throughout this process and welcome any further inquiries or questions you may have.</p>
        
        <p>Thank you for your understanding and willingness to improve. We look forward to the possibility of reconsidering your application in the future.</p>
        
        <p>Warm regards,</p>

        <div class="footer-remove-gap">
          <p>Support Team</p>
          <p>View.Live</p>
        </div>
      </div>
    </body>
    </html>
    `;

  return accept === Status.APPROVED ? message : reject;
}


export default AdminBManage;
