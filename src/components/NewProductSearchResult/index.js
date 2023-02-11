import React, {useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import SearchBarAddNewProduct from '../SearchBarAddNewProduct';
import './styles.scss';
import { Link } from 'react-router-dom';

//actions
import { fetchProductsStart } from '../../redux/Products/products.actions';


// components
import NewProduct from './Product';
import LoadMore from '../LoadMore';


const mapState = ({productsData}) => ({
    products : productsData.products
});



const NewProductResults = ({}) => {

    const dispatch = useDispatch();
    const {searchType} = useParams();
    const { products} = useSelector(mapState);


    const {data,queryDoc, isLastPage} = products;

    useEffect(() => {
        dispatch(
            fetchProductsStart({searchType})
        )
    }, [searchType]);

    if(!Array.isArray(data)) return null;
    if(data.length <1){
        return(
         <div className="products">
             <p>
                 No search results.
             </p>
         </div>
        );
    }
    

    const handleLoadMore = () => {
        dispatch(
            fetchProductsStart({
                searchType, 
                startAfterDoc:  queryDoc,
                persistProducts: data
             })
        )

    }

    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore,
    };


    return (
        <div className="products">

        <div className="search-bar">  
          <SearchBarAddNewProduct/>
        </div>

        
            <h1>
                Search results
            </h1>
                           

            <div className="productResults">
            {data.map((product, pos) => {
                const {productThumbnail, productName} = product;
                if(!productThumbnail || !productName
                          ) return null;
                  
                 
                
                    const configProduct = {
                        ...product
                    };
                            return(<NewProduct {...configProduct}/>)                
                        
                    
            })}
            </div>

           

            {!isLastPage && (
                <LoadMore {...configLoadMore}/>
            )}

{/* <p>If you have not found the product in Beherawi's catalog, please: <Link>Create a new product Listing </Link>    </p> */}
        </div>
    );
};
export default NewProductResults;