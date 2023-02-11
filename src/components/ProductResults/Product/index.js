import React from 'react'
import { Link , useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';




// buttons
import Button from '../../forms/Button';

//actions
import { addProduct } from '../../../redux/Cart/cart.action';

const Product = (product) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const {
        documentID,
        productThumbnail,  
        productName, 
        price,
        holdOn,
        sellOrRent,
        author,
        bookCover,
        condition,
        deliveryMethod,
        subGenres,
       
    }= product;
    

    if(!documentID || !productThumbnail || !productName || !author ||
        typeof price === 'undefined') return null;

    const authorNames = author.split(" ")
    const subGenresNames = subGenres.split(" ")

    const configAddToCartBtn = {
        type: 'button'
    };
    
    const handleAddToCart = (product) => {

        if (!product) return;
        dispatch(
          addProduct(product)
        );
        history.push('/cart');
        
      };
    
    return(
        <div className = "productPreview">

            <div className="thumb">

              <Link to= {`/sellerProductInfoForBuyers/${documentID}`}>
                <img src={productThumbnail} alt={productName} />
              </Link>

            </div>

            <div className="details">

                <ul>

                    <li>
                        <span className="name">
                            <Link to= {`/sellerProductInfoForBuyers/${documentID}`}>
                               {productName.charAt(0).toUpperCase()+productName.slice(1)} 
                           </Link>
                        </span>
                    </li>

                    <li>
                        <span className="author">
                            {author && 'by '} {author && authorNames.map((authorName)=>{
                                return authorName[0].toUpperCase()+ authorName.substring(1)
                            }).join(" ")}
                        </span>
                    </li>

                    <li>
                        <span className="sellOrRent">
                            {sellOrRent && 'For '} {sellOrRent && sellOrRent.charAt(0).toUpperCase()+ sellOrRent.slice(1)}

                        </span>
                    </li>
                    
                    <li>
                        <span className="bookCoverAndCondition">
                            
                               {bookCover && bookCover.charAt(0).toUpperCase()+ bookCover.slice(1)} | {condition && condition.charAt(0).toUpperCase()+ condition.slice(1)}
                           
                        </span>
                    </li>

                    <li>
                        <span className="subGenres">
                            
                        {subGenres && subGenresNames.map((subGenresName)=>{
                                return subGenresName[0].toUpperCase()+ subGenresName.substring(1)
                            }).join(" ")}
                           
                        </span>
                    </li>

                    <li>
                        <span className="delivery">
                            
                               {deliveryMethod== "beherawi delivery" && "Free Beherawi Delivery"} 
                           
                        </span>
                    </li>
                    
                    {sellOrRent && sellOrRent =="sell" && (
                            <li>
                            <span className="price">
                               {price} Br 
                            </span>
                        </li>
                    )}

                    {sellOrRent && sellOrRent =="rent" && (
                            <li>
                            <span className="holdOn">
                              Hold on ('Masiyaza') : {holdOn} Br 
                            </span>
                        </li>
                    )}

                    {sellOrRent && sellOrRent =="rent" && (
                            <li>
                            <span className="price">
                               {price} Br / day
                            </span>
                        </li>
                    )}
                    

                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCartBtn} onClick ={()  => handleAddToCart(product)}>
                               Add to cart 
                            </Button>
                        </div>
                    </li>

                </ul>

            </div>

         
        </div>
    );
};

export default Product;