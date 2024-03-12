import React, { useEffect, useState, useContext } from 'react';
import {DatabaseContext} from '../../../../setup/context-manager/dbContext';
import { Link } from 'react-router-dom';
import {listBusinesses, listLocations} from "../../../../graphql/queries";
import "./style.css"; 
import { Business, Status } from '../../../../API';
import Loading from '../../../../common/Components/pre-loader/Loading';
import newLocation from "../../../../assets/SVG/newlocation.svg";

export const LInquires = () => {
  const [data,setData] = useState<any[] | null>(null);
  const {pullDataFilter} = useContext(DatabaseContext);
  useEffect(() => {
    getData();
  },[]);

  const getData = async () => {
    try {
      const variables = {
        filter: {
          status: {
            eq: Status.WAITING,
          },

        }
      };
  
      let response = await pullDataFilter(listLocations, variables, "USER");
      await console.log(data);
      setData(response.data.listLocations.items);
      
    } catch(response){
      console.log(response);
    }
  }

  return(
    <div className='bbView-container'>
      <div className='dash-header-page'>
        <div className='name-path-dash-page'>
          <h2>Location Inquires</h2>
          <p className='path-style'>Dashboard <i className="bi bi-chevron-right"></i> Location Inquires</p>
        </div>
        <div className='action-button-container-dash'>
          {/*add action button*/ }
        </div>
      </div>
      <table className='table-of-items'>
        <thead>
          <th>Location <i className="bi bi-arrow-down"></i></th>
          <th>Status</th>
          <th></th>
        </thead>
        <tbody>
          {data === null ? <Loading /> : 
          data?.length === 0 ? 
            <div className='waiting-aprocal-box-desgine'>
              <img src={newLocation} width={300} />
              <h2>No Location Found</h2>
              <p>We noticed that you haven't made any entries yet. Don't worry, it's easy to get started. Simply click on the 'Create New Entry' button to begin. We can't wait to see what you create. If you have any questions or need assistance, please feel free to reach out to our support team.</p>
            </div>
          : 
            data.map((element:Business) => 
              <tr>
                <td>
                <div className='company-info-bview'>
                  <h3>{element.name}</h3>
                  {/* <p>{element.address.address}, {element.address.city} {element.address.state}, {element.address.postalcode} {element.address.country}</p> */}
                </div>
                </td>
                <td><div className='status-bar-view-location'>Waiting For Approval</div></td>
                <td></td>
                <td><Link to={`/dashboard/admin/location-inquires/${element.id}`}  className='light-button link-button'><i className="bi bi-pencil-square"></i> View Location</Link></td>
              </tr>
            )} 
            

        </tbody>
      </table>
    </div>
  )
}
