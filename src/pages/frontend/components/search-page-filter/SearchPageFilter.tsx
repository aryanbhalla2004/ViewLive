import React from 'react'
import Slider from 'rc-slider';
import { Location } from '../../../../API';

const marks = {
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50'
};

interface prop {
  dataSearched: Location[] | null;
  searchText: string
}


export const SearchPageFilter = (props: prop) => {
  return (
    <div className="item-filters">
      {/* {props.dataSearched.length > 0 && (
        <>
          <div className="search-result-header">
            <h2>"{props.searchText}"</h2>
            <p>{props.dataSearched.length} results for "{props.searchText}"</p>
          </div>
          <button>Clear all</button>
        </>
      )} */}
      <ul>
        <li>
          <div className="filter-header-single">
            <h2>My Favorites</h2>
            <label className="checkbox style-e">
              <input type="checkbox" />
              <div className="checkbox__checkmark"></div>
            </label>
          </div>
        </li>
        <li>
          <div className="filter-header-single">
            <h2>Sort</h2>
          </div>
          <ul className="sort-list">
            <li>
              <input type="radio" id="option1" name="radio" value="option1" defaultChecked/>
              <label htmlFor="option1">Picked for you (default)</label>
            </li>
            <li>
              <input type="radio" id="option2" name="radio" value="option2" />
              <label htmlFor="option2">New Opening</label>
            </li>
            <li>
              <input type="radio" id="option3" name="radio" value="option2" />
              <label htmlFor="option3">Most Popular</label>
            </li>
            <li>
              <input type="radio" id="option4" name="radio" value="option3" />
              <label htmlFor="option4">Rating</label>
            </li>
          </ul>
        </li>
        <li>
          <div className="filter-header-single">
            <h2>Price Range</h2>
          </div>
          <ul className="price-list">
            <li>
              <button>
                <i className="bi bi-currency-dollar"></i>
              </button>
            </li>
            <li>
              <button>
                <i className="bi bi-currency-dollar"></i>
                <i className="bi bi-currency-dollar"></i>
              </button>
            </li>
            <li>
              <button>
                <i className="bi bi-currency-dollar"></i>
                <i className="bi bi-currency-dollar"></i>
                <i className="bi bi-currency-dollar"></i>
              </button>
            </li>
          </ul>
        </li>
        <li>
          <div className="filter-header-single">
            <h2>Distance Coverage (km)</h2>
          </div>
          <div className="distance-ranger">
            <Slider min={0} max={50} value={[10, 30]} marks={marks} range />
          </div>
        </li>
      </ul>
    </div>
  )
}
