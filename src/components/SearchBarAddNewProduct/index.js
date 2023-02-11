import React, {useState} from 'react'
import { useHistory, useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles.scss'


//components

import FormInput from '../forms/FormInput';


//action 



//image





const SearchBarAddNewProduct = ({}) => {


    const [nextSearch, setSearch] = useState('');
    const history = useHistory();
    const {searchType} = useParams();

    



    const handleFilter = (e) => {
        e.preventDefault();
        history.push(`/searchNewProduct/${nextSearch}`)
        
    };

   
   

    return(

        
               
        <header className = "wrapper">
            

        <div className="container">
     

        

          

            < div className="searchWrap">
         

                
                
                    

            

                    

                  
                    <div className="searchBox">


                        <form onSubmit={handleFilter}>

                        {/* <Link to="/searchresults">
                            ALL 
                        </Link> */}
                        
                         <input
                             className = "input"
                             label=""
                             placeholder = "Title of the book"
                             type="text"
                             value={nextSearch}
                             onChange={e => setSearch(e.target.value.toLowerCase())}
                             /> 

                        <div className="searchBtn" >

                        
                            <button type='submit' className="fas fa-search" ></button> 
                        
                        </div>
                        

                      </form>  
                    </div>

            
                                
          </div>
        </div>

    </header>         
    );
 
};


export default SearchBarAddNewProduct;