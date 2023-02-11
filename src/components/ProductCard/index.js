import React, { useEffect , useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';

import { saveSellerProducts } from '../../redux/SellerProducts/sellerproducts.actions';

import {CKEditor}  from 'ckeditor4-react';
//import { saveSellerProducts } from '../../../redux/SellerProducts/sellerproducts.actions';


// actions

import { addProduct } from '../../redux/Cart/cart.action';

// buttons
import Button from './../forms/Button';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import Modal from '../Modal';


const mapState = state => ({
  product: state.productsData.products.data
});

const ProductCard = ({}) => {
  const dispatch = useDispatch();
  const [price,setPrice] = useState()
  
  const [condition, setCondition] = useState('new')
  const [quantity, setQuantity] = useState()
  const [printedIn, setPrintedIn] = useState('black and white');
  const [bookCover, setBookCover] = useState('softcover')
  const [productCondition, setProductCondition] = useState('')
  const [edition, setEdition]= useState()
  const [deliveryMethod, setDeliveryMethod] = useState('beherawi delivery')

  const history = useHistory();
  const { productID } = useParams();
  const { product } = useSelector(mapState);
  const [hideModal, setHideModal] = useState(true);
  
  if(!product){
    history.push('/')
    return true;
  }
    const {
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
    } = product.find(item=> item.documentID == productID);
    
  

  const configAddToMyStore = {
    type: 'button'
 };

  const resetForm =() =>{
       setPrice()
       setCondition('new')
       setQuantity()
       setPrintedIn('black and white')
       setBookCover('softcover')
       setProductCondition('')
       setEdition()
       setDeliveryMethod('beherawi delivery')
  }



  // const handleAddToCart = (product) => {

  //   if (!product) return;
  //   dispatch(
  //     addProduct(product)
  //   );
  //   history.push('/cart');

  // }

  const configAddToCartBtn = {
    type: 'button'
  }

  const toggleModal = () => {
    setHideModal(!hideModal);  
}

  const configModal = {
    hideModal,
    toggleModal,
  };

  const handleFormSubmit =  e => {
    e.preventDefault();
    
    
    
      const configSellerProduct = {
          price : price,
          condition:condition,
          quantity: quantity,
          printedIn: printedIn,
          bookCover: bookCover,
          productCondition: productCondition,
          edition:edition,
          deliveryMethod:deliveryMethod,

          keywords : keywords,
          productCategory: productCategory,
          type: type,
          genres: genres,
          subGenres: subGenres,
          productName: productName,
          language: language,
          author: author,
          printLength: printLength,
          publisher: publisher,
          publicationYear: publicationYear,
          isbn10: isbn10,
          isbn13: isbn13,
          productDesc: productDesc,
          productThumbnail: productThumbnail,
          documentID: documentID    
      }

    dispatch(
        saveSellerProducts(configSellerProduct)
      )
        setHideModal(!hideModal);
        resetForm()
        history.push('/myStore')
  };    

  return (
    <div className="productCard">


      <Modal {...configModal}>

             <form onSubmit= {handleFormSubmit}>


        {productCategory && (productCategory == "books") && 
            
            ( <FormSelect
              label="Book Cover"
              options={[{
                value: "softcover",
                name: "Softcover"
              }, {
                value: "hardcover",
                name: "Hardcover"
              }
              ]}
              handleChange={e => setBookCover(e.target.value)}
            />)
           }


          {productCategory && (productCategory == "books") && 
            
            ( <FormSelect
              label="Printed in"
              options={[{
                value: "black and white",
                name: "Black and White"
              }, {
                value: "color",
                name: "Color"
              }
              ]}
              handleChange={e => setPrintedIn(e.target.value)}
            />)
           }


              <FormSelect
              label="Condition"
              options={[{
                value: "new",
                name: "New"
              }, 
              { 
                value: "used-like new",
                name: "Used-Like-New"
              },
              
              {
                value: "used-good",
                name: "Used-Good"
              }, {
                value: "used-acceptable",
                name: "Used-Acceptable"
              }
              ]}
              handleChange={e => setCondition(e.target.value)}
            /> 

          {productCategory && (productCategory == "books") && 
            
            (
            <FormInput
              required
              label="Edition of the book"
              placeholder = "Only numbers"
              type="number"
              min="1"
              step="1"
              value={edition}
              handleChange={e => setEdition(e.target.value)}
            />)}

            

            <FormInput
              required
              label="Quantity"
              placeholder = "Only numbers"
              type="number"
              min="1"
              step="1"
              value={quantity}
              handleChange={e => setQuantity(e.target.value.toLowerCase())}
            />

           <FormSelect
              label="Delivery Method"
              options={[{
                value: "beherawi delivery",
                name: "Beherawi Delivery"
              }
              ]}
              handleChange={e => setDeliveryMethod(e.target.value)}
            />

           <h5>Note: When you enter the price of 
              the product, please include the service fee you will
              be charged when the product is sold. The service fee depends 
              on the Product's Category. Thank you.
            </h5>
          {productCategory && (productCategory == "books") && 
            
            
            (<FormInput
              required
              label="Price in Birr"
              placeholder = "Price after 20% Beherawi's Service Fee "
              type="number"
              min="0.00"
              value={price}
              handleChange={e => setPrice(e.target.value)}
            />)}

            
            
            
            <h4>
              Anything to tell us about product's condition ? (optional)
              </h4>
            <textarea
              
              style = {{width:'100%'}}
              placeholder = "Please don't include any manufacturer's product decription "
              value={productCondition}
              onChange={e => setProductCondition(e.target.value)}
            />
            

          

            <br />
            <br />
            



             <Button type='submit'>
                Add TO MY STORE
            </Button>

             </form>
            
        </Modal>
      
        <div className="imgdetail">
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
                   ISBN-10 : {isbn10&& isbn10.charAt(0).toUpperCase()+isbn10.slice(1)} 
            </span>
          </li>

          <li>
            <span className="isbn13">
                   ISBN-13 {isbn13&& isbn13.charAt(0).toUpperCase()+isbn13.slice(1)} 
            </span>
          </li>

          <br />

          <li>
            <span className="productDesc">
                  <div className = "title">
                     {productDesc && <span>Product Content : </span>} 
                  </div>
                  <div className="content">
                     {productDesc&& (
                        <span
                        className="desc"
                        dangerouslySetInnerHTML={{ __html: productDesc }} />
                     )
                     }
                  </div>
                   
            </span>
          </li>

         

         

          <li>
            <div className="addToMyStore">
            <Button {...configAddToMyStore} onClick ={()  =>toggleModal() }>
               Choose 
            </Button>
            </div>
          </li>

          
          
        </ul>
      </div>
    </div>
  );
}

export default ProductCard;