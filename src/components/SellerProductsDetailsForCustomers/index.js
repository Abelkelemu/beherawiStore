import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './styles.scss'



import Button from '../forms/Button'




import { deleteSellerProduct } from '../../redux/SellerProducts/sellerproducts.actions';
import { addProduct } from '../../redux/Cart/cart.action';
import sellerProductsTypes from '../../redux/SellerProducts/sellerproducts.types';


const mapState = ({ sellerProductsData }) => ({
  sellerProducts: sellerProductsData.sellerProducts.data
});



const SellerProductsDetailsForCustomers = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { productID } = useParams();
  const { sellerProducts } = useSelector(mapState);


  if(!sellerProducts){
    history.push('/')
    return true;
  }
    const {
     
      bookCover,
      condition,
      deliveryMethod,
      edition,
      price,
      printedIn,
      productCondition,
      quantity,

      keywords,
      productCategory,
      type,
      genres,
      subGenres,
      productName,
      language,
      author,
      printLength,
      publisher,
      publicationYear,
      isbn10,
      isbn13,
      productDesc,
      productThumbnail,
      documentID
    } = sellerProducts.find(item=> item.documentID == productID);





    const handleAddToCart = () => {

        
        dispatch(
          addProduct(sellerProducts.find(item=> item.documentID == productID))
        );
        history.push('/cart');
        
      }; 

      const configAddToCartBtn = {
        type: 'button'
    };

  return (

 <div className="sellerProductDetails">
    
        <div className="imgDetail">
          <img src={productThumbnail} alt={productName} />
        </div>

        <div className="productDetails">

          <ul>

              <li>
                  <span className="productCategory">
                        Product Category :  {productCategory&& productCategory.charAt(0).toUpperCase()+productCategory.slice(1)} 
                  </span>
              </li>

              <li>
                <span className="name">
                      Product Name :  {productName&& productName.charAt(0).toUpperCase()+productName.slice(1)} 
                </span>
              </li> 

              <li>
                <span className="author">
                      By : {author&& author.charAt(0).toUpperCase()+author.slice(1)} 
                </span>
              </li>

              <li>
                <span className="language">
                      Language :  {language&& language.charAt(0).toUpperCase()+language.slice(1)} 
                </span>
              </li>

              <br/>

              <li>
                <span className="price">
                      Price :  {price&& price} Birr
                </span>
              </li>


              <li>
                <span className="condition">
                      Condition :  {condition&& condition.charAt(0).toUpperCase()+condition.slice(1)} 
                </span>
              </li>

              <li>
                <span className="quantity">
                      Available Quantity :  {quantity&& quantity} pieces
                </span>
              </li>

              <li>
                <span className="deliveryMethod">
                      Delivery Method :  {deliveryMethod && deliveryMethod.charAt(0).toUpperCase()+deliveryMethod.slice(1)} 
                </span>
              </li>

              <br />

              <li>
                <span className="bookCover">
                      Book Cover :  {bookCover&& bookCover.charAt(0).toUpperCase()+bookCover.slice(1)} 
                </span>
              </li>

              <li>
                <span className="edition">
                      Edition :  {edition&& edition}  
                </span>
              </li>

              <li>
                <span className="printedIn">
                      Printed In :  {printedIn&& printedIn.charAt(0).toUpperCase()+ printedIn.slice(1)} 
                </span>
              </li>
              <li>
                <span className="productCondition">
                     { productCondition &&  'Product Condition :' } {productCondition&& productCondition.charAt(0).toUpperCase()+ productCondition.slice(1)} 
                </span>
              </li>

             


              <br />

              <li>
                <span className="type">
                        Type : {type&& type.charAt(0).toUpperCase()+type.slice(1)} 
                </span>
              </li>

              <li>
                <span className="genres">
                      Genres : {genres&& genres.charAt(0).toUpperCase()+genres.slice(1)} 
                </span>
              </li> 

              <li>
                <span className="subGenres">
                      SubGenres : {subGenres&& subGenres.charAt(0).toUpperCase()+subGenres.slice(1)} 
                </span>
              </li>

              <li>
                <span className="printLength">
                      Print Length : {printLength&& printLength.charAt(0).toUpperCase()+printLength.slice(1)} pages
                </span>
              </li>
       
              <br />

              <li>
                <span className="publisher">
                      Publisher : {publisher&& publisher.charAt(0).toUpperCase()+publisher.slice(1)} 
                </span>
              </li>

              <li>
                <span className="publicationYear">
                      Year of publication : {publicationYear&& publicationYear.charAt(0).toUpperCase()+publicationYear.slice(1)} 
                </span>
              </li>

              <li>
                <span className="isbn10">
                {isbn10 && 'ISBN-10 :'} {isbn10&& isbn10.charAt(0).toUpperCase()+isbn10.slice(1)} 
                </span>
              </li>

              <li>
                <span className="isbn13">
                {isbn13 && 'ISBN-13 :'} {isbn13&& isbn13.charAt(0).toUpperCase()+isbn13.slice(1)} 
                </span>
              </li>

              <br />

              <li>
                <span className="productDesc">
                      <div className = "title">
                        {productDesc && <span>Product Content :</span>} 
                      </div>
                      <span
                        className="desc"
                        dangerouslySetInnerHTML={{ __html: productDesc }} />
                      
                      
                </span>
              </li>


              <li>
                  <div className="addToMyStore">
                  <Button {...configAddToCartBtn} onClick ={()  => handleAddToCart()}>
                               Add to cart 
                 </Button>
                  </div>
              </li>

              
          </ul>

    </div>
</div>

  )
}

export default SellerProductsDetailsForCustomers;