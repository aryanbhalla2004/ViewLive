import React, { useContext, useEffect, useState } from 'react'
import { DatabaseContext } from '../../../../setup/context-manager/dbContext';
import { listBusinesses } from '../../../../graphql/queries';
import { Business, Status } from '../../../../API';
import { Link } from 'react-router-dom';
import Loading from '../../../../common/Components/pre-loader/Loading';
import newLocation from "../../../../assets/SVG/newlocation.svg";

export const AllBusiness = () => {

  const [data,setData] = useState<any[] | null>(null);
  const {pullDataFilter} = useContext(DatabaseContext);
  
  useEffect(() => {
    getData();
  },[]);

  const getData = async () => {
    try{
      const variables = {
        filter: {
          status: {
            ne: Status.WAITING,
          },

        }
      };
  
      let response = await pullDataFilter(listBusinesses, variables, "USER");
      await setData(response.data.listBusinesses.items);
      console.log(data);
    } catch(response){
      console.log(response);
    }
  }
  
  return (
    <div className='bbView-container'>
      <div className='dash-header-page'>
        <div className='name-path-dash-page'>
          <h2>All Business</h2>
          <p className='path-style'>Dashboard <i className="bi bi-chevron-right"></i> All Business</p>
        </div>
        <div className='action-button-container-dash'>
          {/*add action button*/ }
        </div>
      </div>
      <table className='table-of-items'>
        <thead>
          <th>Business <i className="bi bi-arrow-down"></i></th>
          <th>Verfied</th>
          <th></th>
        </thead>
        <tbody>
        {data === null ? <Loading /> : 
          data?.length === 0 ? 
            <div className='waiting-aprocal-box-desgine'>
              <img src={newLocation} width={300} />
              <h2>No Business Found</h2>
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
                <td><div className='status-bar-view-location'>{element.status}</div></td>
                <td></td>
                <td><Link to={`/dashboard/admin/business-inquires/${element.id}`}  className='light-button link-button'><i className="bi bi-pencil-square"></i> View Business</Link></td>
              </tr>
            )} 
        </tbody>
      </table>
    </div>
  )
}
