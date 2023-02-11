import React, { useState, useEffect, Component } from 'react';
import { Link , useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {CKEditor}  from 'ckeditor4-react';
import { saveSellerProducts } from '../../../redux/SellerProducts/sellerproducts.actions';
import { saveOrderHistory } from '../../../redux/Orders/orders.actions';
import Modal from '../../Modal';
import { checkUserIsAdmin } from '../../../Utils';

// buttons
import Button from '../../forms/Button';
import FormInput from '../../forms/FormInput';
import FormSelect from '../../forms/FormSelect'

//actions
import { addProduct } from '../../../redux/Cart/cart.action';

const mapState = ( {user}) => ({
  currentUser: user.currentUser
});

const NewProduct = (product) => {

  
    const dispatch = useDispatch();
    
    const {currentUser}= useSelector(mapState)
    const isAdmin = checkUserIsAdmin(currentUser);
    const [price,setPrice] = useState()
    const [condition, setCondition] = useState('new')
    const [quantity, setQuantity] = useState()
    const [printedIn, setPrintedIn] = useState('black and white');
    const [bookCover, setBookCover] = useState('softcover')
    const [productCondition, setProductCondition] = useState('')
    const [edition, setEdition]= useState()
    const [deliveryMethod, setDeliveryMethod] = useState('beherawi delivery')
    const history = useHistory();
    const [hideModal, setHideModal] = useState(true);
    const [provider, setProvider] = useState('')
    const [sellOrRent, setSellOrRent] = useState('sell')
    const [holdOn, setHoldOn]= useState(1)
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
      } = product;


    if(!documentID || !productThumbnail || !productName
        ) return null;


    const configAddToMyStore = {
        type: 'button'
    };
    

    const toggleModal = () => {
        setHideModal(!hideModal);  
    }

    const configModal = {
        hideModal,
        toggleModal,
      };
   
      const resetForm =() =>{
        setSellOrRent('sell')
        setHoldOn(1)
        setPrice()
        setProvider('')
        setCondition('new')
        setQuantity()
        setPrintedIn('black and white')
        setBookCover('softcover')
        setProductCondition('')
        setEdition()
        setDeliveryMethod('beherawi delivery')
   }

    const handleFormSubmit =  e => {
        e.preventDefault();
        
        
        
        const configSellerProduct = {
            sellOrRent: sellOrRent,
            price : price,
            holdOn: holdOn,
            condition:condition,
            provider: provider,
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

      
    
    return(


        
        <div className = "product">
             <Modal {...configModal}>

             <form onSubmit= {handleFormSubmit}>
              <h2>fill out the form</h2>
             <FormSelect
              label="Sell or Rent"
              options={[{
                value: "sell",
                name: "Sell"
              },             
                {
                value: "rent",
                name: "Rent"
              }
              ]}
              handleChange={e => setSellOrRent(e.target.value)}
            />


        {(isAdmin && productCategory=="books") &&
            
            ( <FormSelect
              label="Provided by"
              options={[{
                value: "",
                name: "Choose a provider"
              },
              , {
                value: "beherawi store",
                name: "Beherawi Store"
              },             
                {
                value: "jafer book store",
                name: "Jafer Book Store"
              }, {
                value: "commerce book store",
                name: "Commerce Book Store"
              }, {
                value: "emad book store",
                name: "Emad Book Store"
              }
              ]}
              handleChange={e => setProvider(e.target.value)}
            />)
           }


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
              be charged when the product is sold or rented. The service fee depends 
              on the Product's Category. Thank you.
            </h5>
          {productCategory && (productCategory == "books") && (sellOrRent=='sell') && 
            
            
            (<FormInput
              required
              label="Price in Birr"
              placeholder = "Price after 20% Beherawi's Service Fee "
              type="number"
              min="0.00"
              step="0.1"
              value={price}
              handleChange={e => setPrice(e.target.value)}
            />)}


          {productCategory && (productCategory == "books") && (sellOrRent=='rent') && 
            
            
            (<FormInput
              required
              label="Price per day in Birr"
              placeholder = "Price after 20% Beherawi's Service Fee "
              type="number"
              min="0.00"
              step="0.1"
              value={price}
              handleChange={e => setPrice(e.target.value)}
            />)}

          {productCategory && (productCategory == "books") && (sellOrRent=='rent') && 
            (
               [<h5>A hold or 'Masiyaza' is the additional money a cutomer needs to temporarily give to Beherawi to rent this specific book. This money will be given back to the customer once they return the book. </h5>,
               <h5>However, if the customer doesn't return the book, you will be given the hold on ('masiyaza')</h5>]
            
            )}

            


          {productCategory && (productCategory == "books") && (sellOrRent=='rent') && 
            
            
            (<FormInput
              required
              label="A hold amount (Masiyaza)"
              placeholder = "A hold or 'Masiyaza' in Birr "
              type="number"
              min="0.00"
              step="0.1"
              value={holdOn}
              handleChange={e => setHoldOn(e.target.value)}
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

            <div className="thumb">

              <Link to= {`/product/${documentID}`}>
                <img src={productThumbnail} alt={productName} />
              </Link>

            </div>

            <div className="details">

                <ul>

                    <li>
                        <span className="name">
                            <Link to= {`/product/${documentID}`}>
                               {productName.charAt(0).toUpperCase()+productName.slice(1)} 
                           </Link>
                        </span>
                    </li>

                    
                    <li>
                        <span className="author">
                              By : {author.charAt(0).toUpperCase()+author.slice(1)} 
                        </span>
                    </li>

                    <li>
                        <span className="language">
                              Language : {language.charAt(0).toUpperCase()+language.slice(1)} 
                        </span>
                    </li>

                    <li>
                        <span className="isbn10">
                              ISBN-10 : {isbn10 && isbn10} 
                        </span>
                        
                    </li>

                    <li>
                        <span className="isbn13">
                              ISBN-13 : {isbn13 && isbn13} 
                        </span>
                        
                    </li>

                    <li>
                        <span className="seemore">
                           <Link to= {`/product/${documentID}`}>
                               <Button>
                                   See More...
                               </Button>
                           </Link>  
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
};

export default NewProduct;