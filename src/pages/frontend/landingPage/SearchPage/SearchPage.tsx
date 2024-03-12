// import React, {useState, useRef, useMemo, useEffect, useContext} from 'react';
// import debouce from "lodash.debounce";
// import "./style.css";
// import { useSearchParams } from "react-router-dom";
// import { useLocation, useParams, useNavigate } from 'react-router-dom';
// import view from "../../../../assets/Images/view.jpg";
// import city from "../../../../assets/Images/city.jpg";
// import { gql } from 'graphql-tag';
// import family from "../../../../assets/Images/family.jpg";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
// import { LocationCard } from '../../../../common/Components/business-card/LocationCard';
// import { DatabaseContext } from '../../../../setup/context-manager/dbContext';
// import { API, graphqlOperation } from 'aws-amplify';
// import { IStorageLocation } from '../../../../common/Interfaces/IStorageLocation';
// import { listLocations } from '../../../../graphql/queries';
// import { CategoriesSelect } from '../../../../common/util/categories';
// import Select from 'react-select';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';
// import { AccountContext } from '../../../../setup/context-manager/AuthContext';
// import { URLSearchParams } from 'url';

// const marks = {
//   0: '0',
//   10: '10',
//   20: '20',
//   30: '30',
//   40: '40',
//   50: '50'
// };

// export const SearchPage = () => {
//   const searchBar = useRef<any>(null);
//   const [error, setError] = useState<string>("");
//   const {getLocalStorage} = useContext(AccountContext);
//   const {pullDataFilter,fullDataAPI} = useContext(DatabaseContext);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [search, setSearch] = useState<string>("");
//   const [category, setCategory] = useState(CategoriesSelect[0]);
//   const [dataSearched, setDataSearched] = useState<any>([]);
//   const [autoFillSearch, setAutoFillSearch] = useState<any>([]);
//   const [autoFillData, setAutoFillData] = useState<any>([]);


//   const [cords, setCords] = useState<IStorageLocation | null>(null);
//   // useEffect(() => {
//   //   pullAutoFillData();
//   // }, [search]);

//   useEffect(() => {
//     searchBar.current.focus();
//   }, []);

//   useEffect(() => {   
//     console.log(searchParams.get("query"));
//     setUp();

    
//   }, [searchParams]);

//   useEffect(() => {
//     searchBar.current.focus();
//   }, []);


//   useEffect(() => {
//     return () => {
//       debouncedResults.cancel();
//     };
//   });


//   const pullAutoFillData = async () => {
//     const GET_LOCO_QUERY = gql`
//       query ListLocations(
//         $filter: ModelLocationFilterInput
//         $limit: Int
//         $nextToken: String
//       ) {
//         listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
//           items {
//             id
//             name
//             category
//             hours {
//               open
//               startTime
//               endTime
//               name
//               __typename
//             }
//             searchField
//             status
//             keywords
//             Reviews {
//               nextToken
//               __typename
//             }
//             locationImage
//           }
//           nextToken
//           __typename
//         }
//       }
//     `;

//     const latandlon = getLocalStorage();
//     let variables;
//       let se; 
//     if (search !== undefined) {
//       se = search!.split(" ").join("").toLowerCase();
//     }
//     console.log(se);
//     if (latandlon !== null) {
//       variables = {
//         filter: {
//           or: [
//             { searchField: { contains:  se} },
//             { keywords: { contains: se } }
//           ],
//           latitude: {
//             between: [latandlon?.minLon, latandlon?.maxLat],
//           },
//           longitude: {
//             between: [latandlon?.minLon, latandlon?.maxLon],
//           },
//         }
//       } 
//     } else {
//       variables = {
//         filter: {
//           searchField: {
//             contains: search
//           }
//         }
//       }
//     };


//     try {
//       let response = await pullDataFilter(GET_LOCO_QUERY, variables, "API");
//       console.log(response.data.listLocations);
//       setAutoFillSearch(response.data.listLocations.items);
      
//     } catch(response){
//       console.log(response);
//     }
//   };

//   const setUp = async () => {
//     const sear = searchParams.get("query") || "";
//     const cato = searchParams.get("category") || "";
//     let data;
//     let string = sear;
//     // add whatever data u will neeed in this query
//     const GET_LOCO_QUERY = gql`
//     query ListLocations(
//       $filter: ModelLocationFilterInput
//       $limit: Int
//       $nextToken: String
//     ) {
//       listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
//         items {
//           id
//           name
//           category
//           hours {
//             open
//             startTime
//             endTime
//             name
//             __typename
//           }
//           searchField
//           status
//           keywords
//           Reviews {
//             nextToken
//             __typename
//           }
//           locationImage
//         }
//         nextToken
//         __typename
//       }
//     }
//   `;

//     string = string.split(" ").join("").toLowerCase() ;
//     let vari = { filter: {}};;
//     const latandlon = getLocalStorage();
//     if (latandlon !== null) {
//      vari  = {

//       filter: {

//         latitude: {
//           between: [latandlon?.minLon, latandlon?.maxLat],
//         },
//         longitude: {
//           between: [latandlon?.minLon, latandlon?.maxLon],
//         }
//       }

//       }
//     } 
     
//     if(cato !== "*" && sear === ""){
//       vari.filter = {
//         category: {
//           eq: cato
//         },
//         ...vari.filter,
//       }
//     } else if (cato !== "*" && sear !== "") {
//       vari.filter = {
//         or: [
//           { searchField: { contains: string } },
//           { keywords: { contains: string } },
//         ],
//         category: {
//           eq: cato
//         },
//         ...vari.filter,
//       }


//       //uncoment this when the search field is fix and remove the top 

//       // vari.filter = {

//       //     searchField: { contains: string },
//       //   category: {
//       //     eq: cato
//       //   },
//       //   ...vari.filter,
//       // }

//     } else {
//       vari.filter = {
//         or: [
//           { searchField: { contains: string } },
//           { keywords: { contains: string } },
//         ],
//         ...vari.filter,
//       }
//       //uncomment this when searchfield works properly witgh meaga string
//       // vari.filter = {
//       //   searchField: { contains: string },
//       //   ...vari.filter,
//       // }
//     }

//     data = await pullDataFilter(GET_LOCO_QUERY, vari, "API");
    
//     console.log(vari);
//     console.log("data");

//     setDataSearched(data.data.listLocations.items);
//     console.log(data.data.listLocations.items);
//   }


//   const submitSearch = (e:any) => {
//     setError("");
//     e.preventDefault();
//     //if(search != undefined)
//     if(search != undefined && search != "") {
//       //console.log(categories.value);
//       navigate(`/search?query=${search}&category=${category.value}`);
//     } else {
//       setError("EMPTY");
//       setTimeout(() => {
//         setError("");
//       }, 400);
//     }
//   }
//   const handleSearch = (e:any) => {
//     setSearch(e.target.value);

//   }
  
//   const debouncedResults = useMemo(() => {
//     return debouce(
//       handleSearch
//     , 100);
//   }, [search]);



//   const handleChange = (selectedOption: any) => {
//     setCategory(selectedOption);
//   };
//   return (
//     <>
//       <section className='search-slider-info'>
//         <div className='content-sizing search-wrapper'>
//           <div className='searchbarMode'>
//             <form onSubmit={submitSearch} className={error === "EMPTY" ? 'shake-effect search-form remove-margin-top' : "search-form remove-margin-top"}>
//               <i className="bi bi-search margin-left"></i>
//                <input ref={searchBar} type="text" defaultValue={searchParams.get("query")!} onChange={debouncedResults}  placeholder='What are you looking for?'/>

//               <i className="bi bi-layers margin-left"></i>
//               <Select defaultValue={CategoriesSelect[0]} onChange={handleChange} options={CategoriesSelect} className="categories-main-page-field"/>
//               <button className='btn btn-primary'>Search</button>
//             </form>
//           </div>
          
//         </div>

//       </section>
//       <div className='result-section-search-container'>
//         <div className='content-sizing results-wrapper'>
//           <div className='item-filters'>
//             {dataSearched.length > 0 && dataSearched && <>
//             <div className='search-result-header'>
//               <h2>"{searchParams.get("query")}"</h2>
//               <p>80+ results for "{searchParams.get("query")}"</p>
//             </div>
//             <button>Clear all</button></>}
//             <ul>
//               <li>
//                 <div className='filter-header-single'>
//                   <h2>My Favorites</h2> 
//                     <label className="checkbox style-e">
//                       <input type="checkbox"/>
//                       <div className="checkbox__checkmark"></div>
//                     </label>
//                 </div>
//               </li>
//               <li>
//                 <div className='filter-header-single'>
//                   <h2>Sort</h2> 
//                   {/* <button><i className="bi bi-chevron-down"></i></button> */}
//                 </div>
//                 <ul className='sort-list'>
//                   <li><input type="radio" id="option1" name="radio" value="option1" /> <label htmlFor='option1'>Picked for you (default)</label></li>
//                   <li><input type="radio" id="option2" name="radio" value="option2" /> <label htmlFor='option2'>New Opening</label></li>
//                   <li><input type="radio" id="option3" name="radio" value="option2" /> <label htmlFor='option3'>Most Popular</label></li>
//                   <li><input type="radio" id="option4" name="radio" value="option3" /> <label htmlFor='option4'>Rating</label></li>
//                 </ul>
//               </li>
//               <li>
//                 <div className='filter-header-single'>
//                   <h2>Price Range</h2> 
//                   {/* <button><i className="bi bi-chevron-down"></i></button> */}
//                 </div>
//                 <ul className='price-list'>
//                   <li><button><i className="bi bi-currency-dollar"></i></button></li>
//                   <li><button><i className="bi bi-currency-dollar"></i><i className="bi bi-currency-dollar"></i></button></li>
//                   <li><button><i className="bi bi-currency-dollar"></i><i className="bi bi-currency-dollar"></i><i className="bi bi-currency-dollar"></i></button></li>
//                 </ul>
//               </li>
//               <li>
//                 <div className='filter-header-single'>
//                   <h2>Distance Coverage (km)</h2> 
//                   {/* <button><i className="bi bi-chevron-down"></i></button> */}
//                 </div>
//                 <div className='distance-ranger'>
//                   <Slider
//                     min={0}
//                     max={50}
//                     value={[10, 30]}
//                     marks={marks}
//                     // onChange={this.handleRangeChange}
//                     range
//                   />
//                 </div>
//               </li>
//             </ul>
//           </div>
//           <div className='result-right-side'>
//             <Select placeholder="Default Order"/>
//             <ul>
//               {dataSearched.length > 0 && dataSearched ? 
                
//                 dataSearched.map((item:any) => (
//                  <li className='single-location-card'>
//                  <div className='banner-image'>
//                    <img src="https://tb-static.uber.com/prod/image-proc/processed_images/82877ef93503c3d6bcfdbb7579e6d091/719c6bd2757b08684c0faae44d43159d.jpeg" />
//                    <div className='over-lay-banner-image-single'>
//                      <button><i className="bi bi-heart"></i></button>
//                    </div>
//                  </div>
//                  <div className='single-location-info'>
//                    <div>
//                      <h2>{item.name}</h2>
//                      <p>6.6 km away <span className='hours-status'>CLOSED</span></p>
//                    </div>
//                    <span className='rating'><i className="bi bi-star-fill"></i>4.4</span>
//                  </div>
//                </li>

//               )) : (<div>
//                 <h2>We didn’t find a match for "{searchParams.get("query")!}"</h2>
//                 <p>Try searching for something else instead</p>
//               </div>)}

             

//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }


import React, { useState, useRef, useMemo, useEffect, useContext } from 'react';
import { useSearchParams, useLocation, useParams, useNavigate } from 'react-router-dom';
import { gql } from 'graphql-tag';
import "./style.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import Select from 'react-select';

import 'rc-slider/assets/index.css';
import { AccountContext } from '../../../../setup/context-manager/AuthContext';
import { CategoriesSelect } from '../../../../common/util/categories';
import { IStorageLocation } from '../../../../common/Interfaces/IStorageLocation';
import { listLocations } from '../../../../graphql/queries';
import { DatabaseContext } from '../../../../setup/context-manager/dbContext';
import debounce from 'lodash.debounce';
import { Location } from '../../../../API';
import { SearchPageFilter } from '../../components/search-page-filter/SearchPageFilter';
import Loading from '../../../../common/Components/pre-loader/Loading';
import noData from "../../../../assets/SVG/no-data.svg";
import { LocationCard } from '../../../../common/Components/business-card/LocationCard';

export const SearchPage: React.FC = () => {
  const searchBarRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const { getLocalStorage } = useContext(AccountContext);
  const { pullDataFilter, fullDataAPI } = useContext(DatabaseContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<any>(CategoriesSelect[0]);
  const [dataSearched, setDataSearched] = useState<Location[] | null>(null);
  const [autoFillSearch, setAutoFillSearch] = useState<any[]>([]);
  const [autoFillData, setAutoFillData] = useState<any[]>([]);

  useEffect(() => {
    searchBarRef.current?.focus();
  }, []);

  useEffect(() => {
    setUp();
    setDataSearched(null);
  }, [searchParams]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }, []);

  useEffect(() => {
    pullAutoFillData();
  }, [search]);

  const pullAutoFillData = async () => {
    const latandlon = getLocalStorage();
    let variables;
    let searchString = search.replace(/ /g, "").toLowerCase();
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
    if (latandlon !== null) {
      variables = {
        filter: {
          or: [
            { searchField: { contains: searchString } },
            { keywords: { contains: searchString } }
          ],
          latitude: {
            between: [latandlon.minLon, latandlon.maxLat]
          },
          longitude: {
            between: [latandlon.minLon, latandlon.maxLon]
          }
        }
      };
    } else {
      variables = {
        filter: {
          searchField: {
            contains: searchString
          }
        }
      };
    }

    try {
      const response = await pullDataFilter(listLocations, variables, "API");
     // console.log(response.data.listLocations);
      setAutoFillSearch(response.data.listLocations.items);
    } catch (error) {
      console.log(error);
    }
  };

  const setUp = async () => {
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
          images {
            type
            key
            __typename
          }
          category
          hours {
            open
            startTime
            endTime
            name
            __typename
          }
          avgRating
          searchField
          status
          keywords
        }
        nextToken
        __typename
      }
    }
  `;
    const queryParam = searchParams.get("query") || "";
    const categoryParam = searchParams.get("category") || "";
    const searchString = queryParam.replace(/ /g, "").toLowerCase();
    
    let variables: any = {
      filter: {}
    };

    const latandlon = getLocalStorage();
    if (latandlon !== null) {
      variables.filter = {
        latitude: {
          between: [latandlon.minLon, latandlon.maxLat]
        },
        longitude: {
          between: [latandlon.minLon, latandlon.maxLon]
        }
      };
    }

    if (categoryParam !== "*" && searchString === "") {
      variables.filter.category = {
        eq: categoryParam
      };
    } else if (categoryParam !== "*" && searchString !== "") {
      variables.filter = {
        or: [
          { searchField: { contains: searchString } },
          { keywords: { contains: searchString } }
        ],
        category: {
          eq: categoryParam
        },
        ...variables.filter
      };
    } else {
      variables.filter = { 
        or: [
          { searchField: { contains: searchString } },
          { keywords: { contains: searchString } }
        ],
        ...variables.filter
      };
    }

    try {
      const response = await pullDataFilter(GET_LOCO_QUERY, variables, "API");
      console.log(variables);
      console.log(response);
      setDataSearched(response.data.listLocations.items);
    } catch (error) {
      console.log(error);
    }
  };

  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (search !== "") {
      navigate(`/search?query=${search}&category=${category.value}`);
    } else {
      setError("EMPTY");
      setTimeout(() => {
        setError("");
      }, 400);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleSearch, 100);
  }, [search]);

  const handleChange = (selectedOption: any) => {
    setCategory(selectedOption);
  };

  return (
    <>
      <section className="search-slider-info">
        <div className="content-sizing search-wrapper">
          <div className="searchbarMode">
            <form onSubmit={submitSearch} className={`search-form remove-margin-top ${error === "EMPTY" ? "shake-effect" : ""}`}>
              <i className="bi bi-search margin-left"></i>
              <input
                ref={searchBarRef}
                type="text"
                defaultValue={searchParams.get("query") || ""}
                onChange={debouncedResults}
                placeholder="What are you looking for?"
              />
              <i className="bi bi-layers margin-left"></i>
              <Select defaultValue={CategoriesSelect[0]} onChange={handleChange} options={CategoriesSelect} className="categories-main-page-field" />
              <button className="btn btn-primary">Search</button>
            </form>
          </div>
        </div>
      </section>
      <div className="result-section-search-container">
        <div className="content-sizing results-wrapper">
          <SearchPageFilter dataSearched={dataSearched} searchText={searchParams.get("query") || ""}/>
          <div className="result-right-side">
            <Select placeholder="Default Order" />
            {dataSearched === null ? <div className='loading-for-items-search-page'><Loading /></div> : dataSearched.length > 0 ?
            <ul>
              {dataSearched.map((item: Location) => (
                <li key={item.id} className="single-location-card">
                  <LocationCard data={item} isSearchItem={true}/>
                </li>
                ))}
            </ul> : 
            <div className='no-results-on-search-page'>
              <img src={noData} />
              <h2>We didn’t find a match for "{searchParams.get("query")|| ""}"</h2>
              <p>Try searching for something else instead</p>
            </div> }
          </div>
        </div>
      </div>
    </>
  );
};
