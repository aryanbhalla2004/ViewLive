import React, { useContext, useEffect, useState, useRef } from 'react'

import { SearchBanner } from '../components/search-banner/SearchBanner';
import { LocationCard } from '../../../common/Components/business-card/LocationCard';
import "./style.css";
import { DatabaseContext } from '../../../setup/context-manager/dbContext';
import { listLocations } from '../../../graphql/queries';
import { Location } from '../../../API';

interface props {
  locations?: Location[]
}

export const LandingPage = (prop: props) => {
  const { fullDataAPI} = useContext(DatabaseContext);
  // useEffect(() => {
  //   getData();
  // },[]);

  // const getData = async () => {
  //   try{
  //     let response = await fullDataAPI(listLocations);
  //     setData(response.data.listLocations.items);
  //   }catch(response){
  //     console.log(response);
  //   }
  // }


  const [scrollX, setscrollX] = useState(true); // For detecting start scroll postion
  const [scrolEnd, setscrolEnd] = useState(false); // For detecting end of scrolling
  const [category, setCategory] = useState({name: "All Categories"});
  const scrl:any = [useRef<any>(), useRef<any>(), useRef<any>()];

  const slide = (shift: number, num: number) => {
    const currentIndex = Math.round(Math.floor(scrl[num].current.scrollLeft / scrl[num].current.clientWidth));
    //console.log(currentIndex);
    const nextIndex = (currentIndex + 1) % scrl[num].current.children.length;
    const nextScrollTop = nextIndex * scrl[num].current.children[nextIndex].clientWidth;
    scrl[num].current.scrollTo({
      left: nextScrollTop,
      behavior: 'smooth'
    });
    //For checking if the scroll has ended
    //console.log("PLUS"+ (Math.ceil(scrl.current.scrollWidth) - Math.ceil(scrl.current.scrollLeft) - (scrl.current.offsetWidth)));
     
  };


  const checkScroll = (num: number) => {
    console.log("minus"+ (Math.ceil(scrl[num].current.scrollWidth) - Math.ceil(scrl[num].current.scrollLeft) - (scrl[num].current.offsetWidth)));
     
    if (
      Math.ceil(scrl[num].current.scrollWidth) - Math.ceil(scrl[num].current.scrollLeft) - (scrl[num].current.offsetWidth) <= 10
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
    if(Math.ceil(scrl[num].current.scrollLeft) <= 10){
      setscrollX(true);
    } else {
      setscrollX(false);
    }
    if(Math.ceil(scrl[num].current.scrollWidth) - Math.ceil(scrl[num].current.scrollLeft) == 0){
      setscrolEnd(false);
    }
  }

  return (
    <>
      <SearchBanner/>
      <div className='trending-block'>
        <div className='content-sizing trending-wrapper'>
          <div className='cards-header'>
            <h2>Trending Around The Town</h2> 
            <div className='movementButton-cards'>
              <button onClick={() => slide(-700, 0)} ><i className="bi bi-chevron-left"></i></button>
              <button onClick={() => slide(700, 0)}><i className="bi bi-chevron-right"></i></button>
            </div> 
          </div>
          
          <ul className="horizontal-scroll-cards" ref={scrl[0]} onScroll={() => checkScroll(0)}> 
            {
              prop.locations && prop.locations.length > 0 ? prop.locations.map((item:any) => (
                <li>
                  <LocationCard data={item} isSearchItem={false}/>
                </li>)) : 

                <div className='not-location-found-item'>
                  <p>No Items Found</p>
                </div>
            }

          </ul>
        </div>
      </div>

      <div className='trending-block'>
        <div className='content-sizing trending-wrapper categories-wrapper-cards'>
          <div className='cards-header'>
            <h2>Highly Rated Business</h2>
            <div className='movementButton-cards'>
            <button onClick={() => slide(-700, 1)} ><i className="bi bi-chevron-left"></i></button>
            <button onClick={() => slide(700, 1)}><i className="bi bi-chevron-right"></i></button>
            </div> 
          </div>
          
          <ul className="horizontal-scroll-cards" ref={scrl[1]} onScroll={() => checkScroll(1)}> 

            {prop.locations && prop.locations.length > 0 ? prop.locations.map((item:any) => (<li>
              <LocationCard data={item} isSearchItem={false}/>
            </li>)) :
            
            <div className='not-location-found-item'>
              <p>No Items Found</p>
            </div> }

          </ul>
        </div>
      </div>
      
      <div className='trending-block'>
        <div className='content-sizing trending-wrapper categories-wrapper-cards'>
          <div className='cards-header'>
            <h2>New Business Around the Block</h2>
            <div className='movementButton-cards'>
            <button onClick={() => slide(-700, 2)} ><i className="bi bi-chevron-left"></i></button>
            <button onClick={() => slide(700, 2)}><i className="bi bi-chevron-right"></i></button>
            </div> 
          </div>
          
          <ul className="horizontal-scroll-cards" ref={scrl[2]} onScroll={() => checkScroll(2)}> 

            {prop.locations && prop.locations.length > 0 ? prop.locations.map((item:any) => (<li>
              <LocationCard data={item} isSearchItem={false}/>
            </li>)) :

            <div className='not-location-found-item'>
              <p>No Items Found</p>
            </div>}
            
          </ul>
        </div>
      </div>


      
    </>
  )
}
