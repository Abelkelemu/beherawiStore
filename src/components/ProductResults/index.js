import React, {useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './styles.scss';

//actions
import { fetchSellerProductsStart } from '../../redux/SellerProducts/sellerproducts.actions';
// components
import Product from './Product';
import LoadMore from '../LoadMore';


const mapState = ({sellerProductsData}) => ({
    products : sellerProductsData.sellerProducts
});

const ProductResults = ({}) => {

    const dispatch = useDispatch();
    const {filterType} = useParams();
    const { products} = useSelector(mapState);
    const {data, queryDoc, isLastPage} = products;


    useEffect(() => {
        dispatch(
            fetchSellerProductsStart({filterType})
        )
    }, [filterType]);


    if(!Array.isArray(data)) return null;
    if(data.length <1){
        return(
         <div className="products">
             <p>
                 No results found.
             </p>
         </div>
        );
    }
    
    const handleLoadMore = () => {
        dispatch(
            fetchSellerProductsStart({
                filterType, 
                startAfterDoc:  queryDoc,
                persistProducts: data
             })
        )
    }

    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore,
    };

    return (
        <div className="filterProducts">
           
           <div className="filters">
             
            <h1>
                Filter results {filterType && 'for'} {filterType&& filterType.charAt(0).toUpperCase()+filterType.slice(1)} {!filterType && ('All Books')}
            </h1>
           
           
           </div>
           

            <div className="productResults">

            {data.map((product, pos) => {

                const {productThumbnail, productName, price} = product;
                
                if(!productThumbnail || !productName ||
                    typeof price === 'undefined') return null;
                    
                    const configProduct = {
                        ...product
                    };
                      return (
                      <Product {...configProduct}/>)
                
            })}
            </div>
            
            {!isLastPage && (
                <LoadMore {...configLoadMore}/>
            )}
           
        </div>
    );
};

export default ProductResults;