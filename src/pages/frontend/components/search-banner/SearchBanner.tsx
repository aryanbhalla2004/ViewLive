import React, {useState, useRef, useEffect, useMemo, useContext} from 'react'
import "./style.css";
import view from "../../../../assets/Images/view.jpg";
import city from "../../../../assets/Images/city.jpg";
import { useNavigate } from 'react-router-dom';
import family from "../../../../assets/Images/family.jpg";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import debouce from "lodash.debounce";
import { gql } from 'graphql-tag';
import { CategoriesSelect, categories as dbCategories } from '../../../../common/util/categories';
import { AccountContext } from '../../../../setup/context-manager/AuthContext';
import { DocumentNode } from 'graphql';
import { DatabaseContext } from '../../../../setup/context-manager/dbContext';
import { Location } from '../../../../API';
import Loading from '../../../../common/Components/pre-loader/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';


const list = [{}, {}, {}, {}];

export const SearchBanner = () => {
  const advertisementVideoRef = useRef<HTMLUListElement>(null);
  const [currentAds, setCurrentAds] = useState(0);

  const searchBar = useRef<any>(null);
  const navigate = useNavigate();
  const [scrollX, setscrollX] = useState(true); // For detecting start scroll postion
  const [scrolEnd, setscrolEnd] = useState(false); // For detecting end of scrolling
  const [search, setSearch] = useState<String>("");
  const [error, setError] = useState<any>("");
  const [autoFillSearch, setAutoFillSearch] = useState<any>([]);
  const [autoFillSugg, setAutoFillSugg] = useState<any>([]);
  const {getLocalStorage} = useContext(AccountContext);
  const {pullDataFilter} = useContext(DatabaseContext);
  const [isInputFoucs, setIsInputFocus] = useState<boolean>(false);
  const [categories, setCategories] = useState<any>(CategoriesSelect[0]);

  useEffect(() => {
    if(autoFillSearch != null)  {
      if(autoFillSearch.length < 5 && autoFillSearch.length > 2) {
        fillKeywords(5-autoFillSearch.length);
      } else {
        fillKeywords(2);
      }
    } else {
      fillKeywords(2);
    }
  }, [autoFillSearch]);

  useEffect(() => {
    searchBar.current.focus();
  }, []);

  const pullAutoFillData = async () => {
    const GET_LOCO_QUERY = gql`
      query ListLocations(
        $filter: ModelLocationFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
          items {
            id
            name
            category
            hours {
              open
              startTime
              endTime
              name
              __typename
            }
            searchField
            status
            keywords
            Reviews {
              nextToken
              __typename
            }
            locationImage
          }
          nextToken
          __typename
        }
      }
    `;

    const searchLimit = 5;

    const latandlon = getLocalStorage();
    let variables;
    let se; 
    if (search !== undefined) {
      se = search.split(" ").join("").toLowerCase();
    }

    if (latandlon !== null) {
      variables = {
        filter: {
          or: [
            { searchField: { contains:  se} },
            { keywords: { contains: se } }
          ],
          latitude: {
            between: [latandlon?.minLon, latandlon?.maxLat],
          },
          longitude: {
            between: [latandlon?.minLon, latandlon?.maxLon],
          }
        },
        "limit": searchLimit,
      } 
    } else {
      variables = {
        filter: {
          searchField: {
            contains: search
          }
        },
        "limit": searchLimit,
      }
    };


    try {
      let response = await pullDataFilter(GET_LOCO_QUERY, variables, "API");
      console.log(response.data.listLocations);
      setAutoFillSearch(response.data.listLocations.items);
    } catch(response){
      console.log(response);
    }
  };

  const fillKeywords = async (amm:any) => {
    console.log(amm);
    const GET_LOCO_QUERY = gql`
    query ListKeywords(
      $filter: ModelKeywordsFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listKeywords(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {    
          keyword
        }
        nextToken
        __typename
      }
    }
  `;
  let variables = {
        filter: {
          id: {
            contains: search
          },
        },

        limit: amm,
        nextToken: null, // S
  }
  try {
    let response = await pullDataFilter(GET_LOCO_QUERY, variables, "API");
    console.log(response);
    setAutoFillSugg(response.data.listKeywords.items);

   
    
  } catch(response){
    console.log(response);
  }


}
  const scrl:any = [useRef<any>(), useRef<any>(), useRef<any>()];

  const slide = (shift: number, num: number) => {
    scrl[num].current.scrollLeft += shift;
    //For checking if the scroll has ended
    console.log("PLUS"+ (Math.ceil(scrl.current.scrollWidth) - Math.ceil(scrl.current.scrollLeft) - (scrl.current.offsetWidth)));
     
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

  const findSearch = (e:any) => {
    setError("");
    e.preventDefault();

    if(search != undefined && search != "") {
      navigate(`/search?query=${search}&category=${categories.value}`);
    } else {
      setError("EMPTY");
      setTimeout(() => {
        setError("");
      }, 400);
    }
  
  }

  const handleChange = (selectedOption: any) => {
    setCategories(selectedOption);
  };

  const debouncedResults = (e:any) => {
    setSearch(e.target.value);
    setAutoFillSearch(null);
    setSelectedSuggestion(-1);
    updateDebounceText(e.target.value);
  };

  const updateDebounceText = debounce((text: any) => {
    pullAutoFillData();
  });

  function debounce(cb:any, delay = 500) {
    let timeout:any;
    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    }
  }

  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);

  const handleKeyDown = (e: any) => {
    if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevents scrolling of the page

      setSelectedSuggestion((prevIndex) =>
        prevIndex < autoFillSearch.length - 1 ? prevIndex + 1 : prevIndex
      ); 
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevents scrolling of the page

      setSelectedSuggestion((prevIndex) =>
        prevIndex < autoFillSearch.length - 1 ? prevIndex - 1 : prevIndex
      ); 
    }
  };

  useEffect(() => {
    if(advertisementVideoRef.current) {
      const nextIndex = (currentAds + 1) % advertisementVideoRef.current.children.length;
      const nextScrollTop = nextIndex * advertisementVideoRef.current.children[nextIndex].clientWidth;
      advertisementVideoRef.current.scrollTo({
        left: nextScrollTop,
        behavior: 'smooth'
      });

      const timeout = setTimeout(() => {
        if(nextIndex == 6) {
          setCurrentAds(0);
        } else {
          setCurrentAds(nextIndex);
        }
        
      }, 2000);

      return () => clearTimeout(timeout);
    }
    // let item = 0;
    // const intervalId = setInterval(() => {
    //   console.log(item);
    //   console.log(item++);
    //   //ScrollAdsVideo(currentAds); // Pass currentAds to the function
    // }, 5000); // Interval in milliseconds, change as needed

    // return () => clearInterval(intervalId);
  }, [currentAds]); // Dependency array is empty, runs only once

  // useEffect(() => {
  //   const handleScroll = (event: WheelEvent) => {
  //     event.preventDefault();
  //   };

  //   const element = advertisementVideoRef.current;

  //   if (element) {
  //     element.addEventListener('wheel', handleScroll, { passive: false });

  //     return () => {
  //       element.removeEventListener('wheel', handleScroll);
  //     };
  //   }
  // }, []);

  

  return (
    <>
      <section className='search-slider-info'>
        <div className='content-sizing search-wrapper'>
          <div className='search-info-cont' >
            <h1>Before You Go <br/><span className='primary-text'>View It Live.</span></h1>
            <p>Find great places to stay, eat, shop or visit from our partners and local experts.</p>
            <form onSubmit={findSearch} className={error === "EMPTY" ? 'shake-effect search-form' : "search-form" }>
              <i className="bi bi-search margin-left"></i>
              <input ref={searchBar} type="text" onChange={debouncedResults} onKeyDown={handleKeyDown} onFocus={() => setIsInputFocus(true)} onBlur={() => setIsInputFocus(false)} placeholder='What are you looking for?'/>
                {isInputFoucs && search && 
                <div className='search-results-suggestion' >
                  <div className='location-ideas'>
                    <span>Stores Near Your</span>
                    {autoFillSearch != null && autoFillSearch.length > 0 ? 
                    <ul>
                      {autoFillSearch.map((item:Location, index: any) => (
                        <li key={index} className={index === selectedSuggestion ? "selected-drop" : ""}>
                          <img src={`https://viewlive2-storage-2d9b46fd102200-dev.s3.ca-central-1.amazonaws.com/public/${item.locationImage}`} />
                          <div className='single-location-item'>
                            <h2>{item.name}</h2>
                            <p>{item.keywords?.toString()}</p>
                          </div>
                        </li>
                      ))}
                    </ul> : 
                    autoFillSearch === null ? <div className='search-bar-loading'><Loading/></div> :
                    <ul>
                       <li>
                          <i className="bi bi-search"></i>
                          <div className='single-location-item'>
                            <h2>Search for "{search}"</h2>
                          </div>
                        </li>
                    </ul>
                    }

                  </div>
                  <div className='keyword-suggestion'>
                    <ul>
                      {autoFillSugg.map((item:any) => ( <li><i className="bi bi-search"></i>{item.keyword}</li>))}
                    </ul>
                  </div>
                </div>}
              
              <i className="bi bi-layers margin-left"></i>
              <Select defaultValue={CategoriesSelect[0]} onChange={handleChange} options={CategoriesSelect} className="categories-main-page-field"/>
              <button className='btn btn-primary'>Search</button>
            </form>
          </div>
          <div className='images-banner'>
            <ul className='scroll-adv-main-page' ref={advertisementVideoRef}>
              {list.map((item, index) => (
                <li className={index === (currentAds + 1) ? "active-selection-ads" : ""}>
                  <div className='ads-info'>
                    Ads
                  </div>
                </li>
              ))}
            </ul> 
          </div>
        </div>
      </section>
      <section className='categories-container'>
        <div className='content-sizing categories-wrapper'>
          <div className='left-button movementButton'>
            <button onClick={() => slide(-700, 0)} ><i className="bi bi-chevron-left"></i></button>
          </div>
          <ul className="horizontal-scroll" ref={scrl[0]} onScroll={() => checkScroll(0)}>   
            {Object.entries(dbCategories).map(([key, value]:any ) => {

              const pre: IconPrefix = value.split(" ")[0];
              const name:IconName = value.split(" ")[1];

              return (<li><FontAwesomeIcon icon={[pre, name]} /><span>{key}</span></li>);
            })}  
          </ul>
          <div className='right-button movementButton'>
            <button onClick={() => slide(700, 0)}><i className="bi bi-chevron-right"></i></button>
          </div>
        </div>
      </section> 

    </>
  )
}
