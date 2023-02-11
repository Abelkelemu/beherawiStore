import React, {useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import './styles.scss';

//actions
import { fetchSellerProductsStart } from '../../redux/SellerProducts/sellerproducts.actions';


//components
import Product from '../ProductResults/Product';
import LoadMore from '../LoadMore';


const mapState = ({sellerProductsData}) => ({
    products : sellerProductsData.sellerProducts
});

const ProductSearchResults = ({}) => {

    const dispatch = useDispatch();
    const {searchType} = useParams();
    const { products} = useSelector(mapState);
    const {data,queryDoc, isLastPage} = products;

    useEffect(() => {
        dispatch(
            fetchSellerProductsStart({searchType})
        )
    }, [searchType]);

    if(!Array.isArray(data)) return null;
   
    if(data.length <1){
        return(
         <div className="products">
             <p>
                 No Results Found.
             </p>
             <p>
                Please try checking your spelling or use more general terms.
             </p>
             
         </div>
        );
    }
    

    const handleLoadMore = () => {
        dispatch(
            fetchSellerProductsStart({
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

        
            <h1>
                Search results {searchType && 'for'} {searchType}
            </h1>
                           

            <div className="productResults">
            {data.map((product, pos) => {
                const {productThumbnail, productName,author,price, bookCover,deliveryMethod, printLength, condition, subGenres   
                } = product;
                if(!productThumbnail || !productName || !author ||
                    typeof price === 'undefined') return null;
                  
                 
                
                    const configProduct = {
                        ...product
                    };
                            return(<Product {...configProduct}/>)                
                        
                    
            })}
            </div>

            {!isLastPage && (
                <LoadMore {...configLoadMore}/>
            )}
        </div>
    );
};

export default ProductSearchResults;