import React, { useContext, useState } from 'react';
import './MobileSearch.css'
import SearchedProducts from '../SearchedProducts/SearchedProducts';
import { ThemeContext } from '../../Contexts/ThemeContext';


const MobileSearch = ({showSearch,handleSearch}) => {
    const {searchText,setSearchText} = useContext(ThemeContext);
    const [focus,setFocus] = useState(false)
    const { products } = useContext(ThemeContext);



    let highPriorityProducts = [];
    let searchedProducts = [];
  
  
    if (searchText.length > 2) {
       searchedProducts = products?.filter((product) =>
        product.name.toLowerCase().includes(searchText?.toLowerCase())
      );

      highPriorityProducts = []
    }
    return (
        <div>
             {/*.......... search bar............. */}
        <div className={`mobile-search form-control text-black w-[100%] ${showSearch?"":"hidden"}`}>
          <div className="input-group">
            <input
              type="text"
              className="border border-black w-[90%] px-4 py-3 mx-auto"
              placeholder="Search for a product..."
              onFocus={()=>setFocus(true)}
              onBlur={()=>{
                setTimeout(()=>setFocus(false),200)
              }}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {/*......... Search result............ */}
          <div>
            <SearchedProducts
              highPriorityProducts={highPriorityProducts}
              searchedProducts={searchedProducts}
              handleSearch={handleSearch}
              focus={focus}
            />
          </div>
        </div>
        </div>
    );
};

export default MobileSearch;