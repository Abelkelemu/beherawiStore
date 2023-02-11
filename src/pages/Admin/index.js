import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link } from 'react-router-dom'
import {CKEditor}  from 'ckeditor4-react';
import imageCompression from 'browser-image-compression';  
import {
  TableContainer, Table, TableHead,
  TableRow, TableBody, TableCell, TableFooter
} from '@material-ui/core';
import moment from 'moment';
import uploadImg from '../../assets/uploadImg.PNG'
import './styles.scss'; 

//actions

import { addProductStart, fetchProductsStart, deleteProductStart, updateProductImageStart} from './../../redux/Products/products.actions';


//components

import Modal from './../../components/Modal';
import Modal2 from '../../components/Modal 2';
import FormInput from './../../components/forms/FormInput';
import FormSelect from '../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
import LoadMore from './../../components/LoadMore';


const mapState = ({ productsData }) => ({
  products: productsData.products
});

const styles = {
  
  fontSize: '16px',
  width: '10%',
  backgroundColor: 'lightGrey',
  cursor: 'pointer',
  
  
};

const Admin = props => {

  const dispatch = useDispatch();

  const { products } = useSelector(mapState);
  const { data, queryDoc, isLastPage }  = products;
  
  const [hideModal, setHideModal] = useState(true);
  const [hideModal2, setHideModal2] = useState(true);

  const [productCategory, setProductCategory] = useState('books');
  const [isbn10, setIsbn10] = useState();
  const [isbn13, setIsbn13] = useState();
  const [author, setAuthor] = useState('');
  const [language, setLanguage] = useState('amharic');
  const [printLength, setPrintLength] = useState();
  const [type, setType] = useState('non-series');
  const [genres, setGenres] = useState('fiction');
  const [subGenres, setSubGenres] = useState('action and adventure');
  const [productName, setProductName] = useState('');
  const [productThumbnail, setProductThumbnail] = useState('');
  const [productPrice, setProductPrice] = useState();
  const [productDesc, setProductDesc] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publicationYear, setPublicationYear] = useState('');

  const [imagePreview, setimagePreview] = useState();
  const [productImg, setProductImg] = useState(null);
  const [tempoID, setTempoID] = useState('');
  const [error,setError] = useState('');
  
  
  useEffect(() => {
    dispatch(
      fetchProductsStart()
    );
  }, []);
  

  const toggleModal = () => setHideModal(!hideModal);
  
  const toggleModal2 =(documentID) => {      
    setHideModal2(!hideModal2)
    setTempoID(documentID)
  }

  const configModal = {
    hideModal,
    toggleModal,
  };

   
  const resetProductImg = () => setProductImg(null);
  const configModal2 = {
    hideModal2,
    toggleModal2,
    resetProductImg
  }


  const resetForm = () => {

    setHideModal(true);
    setProductCategory('books'); 
    setIsbn10();
    setIsbn13();
    setAuthor('')
    setLanguage('amharic')
    setPrintLength()
    setType('non-series')
    setGenres('fiction')
    setSubGenres('action and adventure')
    setProductName('');
    setProductThumbnail('');
    setProductDesc('');
    setProductImg(null);
    setPublicationYear();
    setPublisher();
    
  };

  const resetForm2 = () =>{
    setHideModal2(true);
    setTempoID()
    setimagePreview()
    setProductImg(null)
    
  }

   
  const handleSubmit2 = e => {
    e.preventDefault();
    dispatch(
      updateProductImageStart({
        tempoID,
        productImg
      })  
        )
    resetForm2();
  }

  const types = ['image/png', 'image/jpeg', 'image/jpg']; 

  const options = {
    maxSizeMB: 1/60,
    maxWidthorHeight: 250,
    useWebWorker: true,
  }

  const productImgHandler = (e) => {

    let selectedFile = e.target.files[0];
    let selectedFileSize = e.target.files[0].size;
  
    if (selectedFile && types.includes(selectedFile.type)) {
      
      if (options.maxSizeMB >= selectedFileSize/1000000){
              
        setProductImg(selectedFile);
        setError('')
        setimagePreview(URL.createObjectURL(selectedFile));  
      
      }
      else{
        imageCompression(selectedFile,options).then((result)=>{
          setProductImg(result);
          setError('')
          setimagePreview(URL.createObjectURL(result));          
        })
      }
      
    }
    else {
        setError('Please select a valid image type (jpg , jpeg or png)');
    }
  }


  const handleSubmit = e => {

    e.preventDefault();
    dispatch(
      addProductStart({
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
         
      })
     )
     resetForm()
   
  };


  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data
      })
    );
  };


  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  const inputRef = React.useRef();

	const triggerFileSelectPopup = (e) => {
    e.preventDefault()
    inputRef.current.click();
  }

  return (

    <div className="admin">

      <div className="callToActions">

        <ul>
          <li>
            <Button onClick={() => toggleModal()}>
              Add a new product listing
            </Button>
          </li>
        </ul>

      </div>

      <Modal {...configModal}>

        <div className="addNewProductForm">

          <form onSubmit={handleSubmit}>

            <h2>
              Create a new product listing
            </h2>
            
           
            <FormSelect
              required
              label="Product Category"
              options={[
              {
                value: "books",
                name: "Books"
              },{
                value: "shoes",
                name: "shoes",
                
              },
            ]}
              handleChange={e => setProductCategory(e.target.value)}
            />

            

           {productCategory && (productCategory == "books") && 
            
            ( <FormSelect
              required
              label="Type"
              options={[{
                value: "non-series",
                name: "Non-series"
              }, {
                value: "series",
                name: "Series"
              }
              ]}
              handleChange={e => setType(e.target.value)}
            />)
            }


          {productCategory && (productCategory == "books") && 
            
            ( <FormSelect
              required
              label="Genres"
              options={[{
                value: "fiction",
                name: "Fiction"
              }, {
                value: "nonfiction",
                name: "Nonfiction"
              }
              ]}
              handleChange={e => setGenres(e.target.value)}
            />)
            }

            {genres && (genres == "fiction" && productCategory == "books") && (
                             
            <FormSelect
              required
              label="Subgenres"
              options={[
              {
                value: "action and adventure",
                name: "Action and Adventure",
                
              },{
                value: "alternate history",
                name: "Alternate History",
                
              },{
                value: "anthology",
                name: "Anthology",
                
              },{
                value: "chick lit",
                name: "Chick Lit",
                
              },{
                value: "children's fiction",
                name: "Children's Fiction",
                
              },{
                value: "classic",
                name: "Classic",
                
              },{
                value: "comic books",
                name: "Comic Books",
                
              },{
                value: "coming-of-age",
                name: "Coming-Of-Age",
                
              },{
                value: "crime",
                name: "Crime",
                
              },{
                value: "drama",
                name: "Drama",
                
              },{
                value: "dystopian",
                name: "Dystopian",
                
              },{
                value: "fairytale",
                name: "Fairytale",
                
              },{
                value: "fantasy",
                name: "Fantasy",
                
              },{
                value: "graphic novel",
                name: "Graphic Novel",
                
              },{
                value: "historical fiction",
                name: "Historical Fiction",
                
              },{
                value: "horror",
                name: "Horror",
                
              },{
                value: "mystery",
                name: "Mystery",
                
              },{
                value: "paranormal romance",
                name: "Paranormal Romace",
                
              },{
                value: "picture book",
                name: "Picture Books",
                
              },{
                value: "poetry",
                name: "Poetry",
                
              },{
                value: "political thriller",
                name: "Political Thriller",
                
              },{
                value: "romance",
                name: "Romance",
                
              },{
                value: "satire",
                name: "Satire",
                
              },{
                value: "science fiction",
                name: "Science Fiction",
                
              },{
                value: "short story",
                name: "Short Story",
                
              },{
                value: "suspense",
                name: "Suspense",
                
              },{
                value: "thriller",
                name: "Thriller",
                
              },{
                value: "western",
                name: "Western",
                
              },{
                value: "young adult",
                name: "Young Adult",
                
              },
              ]}
              handleChange={e => setSubGenres(e.target.value)}
            />
            )}

           {genres && (genres == "nonfiction" && productCategory == "books") && (

             <FormSelect
              required
              label="Subgenres"
              options={[
              {
                value: "art or architecture",
                name: "Art/Architecture",
                
              },{
                value: "art and photography",
                name: "Art And Photography",
                
              },{
                value: "autobiography",
                name: "Autobiography",
                
              },{
                value: "biography",
                name: "Biography",
                
              },{
                value: "business or economics",
                name: "Business/Economics",
                
              },{
                value: "crafts or hobbies and home",
                name: "Crafts/Hobbies And Home",
                
              },{
                value: "cookbook",
                name: "Cookbook",
                
              },{
                value: "diary",
                name: "Diary",
                
              },{
                value: "dictionary",
                name: "Dictionary",
                
              },{
                value: "education and teaching",
                name: "Education And Teaching",
                
              },{
                value: "encyclopedia",
                name: "Encyclopedia",
                
              },{
                value: "ethiopian government textbook for students",
                name: "Ethiopian Government Textbook For Students",
                
              },{
                value: "ethiopian reference book for students",
                name: "Ethiopian Reference Book For Students",
              },
              
              {
                value: "families and relationships",
                name: "Families And Relationships",
                
              },{
                value: "health/fitness",
                name: "health/Fitness",
                
              },{
                value: "history",
                name: "History",
                
              },{
                value: "home and garden",
                name: "Home And Garden",
                
              },{
                value: "humor and entertainment",
                name: "Humor And Entertainment",
                
              },{
                value: "journal",
                name: "Journal",
                
              },{
                value: "law and criminology",
                name: "Law And Criminology",
                
              },{
                value: "math",
                name: "Math",
                
              },{
                value: "memoir",
                name: "Memoir",
                
              },{
                value: "motivational or inspirational",
                name: "Motivational/Inspirational",
                
              },{
                value: "philosophy",
                name: "Philosophy",
                
              },{
                value: "politics and social sciences",
                name: "Politics And Social Sciences",
                
              },{
                value: "prayer",
                name: "Prayer",
                
              },{
                value: "religion, spiritual, and new age",
                name: "Religion, Spiritual, And New Age",
                
              },{
                value: "true crime",
                name: "True Crime",
                
              },{
                value: "review",
                name: "Review",
                
              },{
                value: "science",
                name: "Science",
                
              },{
                value: "self help or personal development",
                name: "Self Help/Personal Development",
                
              },{
                value: "sports and leisure",
                name: "Sports And Leisure",
                
              },{
                value: "travel",
                name: "Travel",
                
              },{
                value: "true crime",
                name: "True Crime",
                
              },
              ]}
              handleChange={e => setSubGenres(e.target.value)}
            />
           )}
 
             {productCategory == "books" &&
               ( <FormInput
                required
                label="Title of the book"
                type="text"
                value={productName}
                handleChange={e => setProductName(e.target.value.toLowerCase())} 
                />)
             }

         
            {productName && productCategory=='books' && (
              <FormSelect
              required
              label="Language"
              options={[{
                value: "amharic",
                name: "Amharic"
              }, {
                value: "english",
                name: "English"
              }, {
                value: "french",
                name: "French"
              }, {
                value: "arabic",
                name: "Arabic"
              }
              ]}
              handleChange={e => setLanguage(e.target.value)}
            /> 
            )}


            {productName && productCategory=='books' && (
              <FormInput
              required
              label="Author's name"
              type="text"
              value={author}
              handleChange={e => setAuthor(e.target.value.toLowerCase())}
            /> 
            )}

            {productName && productCategory=='books' && (
              <FormInput
              required
              label="Number of pages"
              type="number"
              min="1"
              step="1"
              value={printLength}
              handleChange={e => setPrintLength(e.target.value)}
            />

            )}

         {productName && productCategory=='books' && (
           
           <h1> Additional Information </h1>           
           
          )}

          {productName && productCategory=='books' && (
              <FormInput
              required
              label="Publisher"
              type="text"
              value={publisher}
              handleChange={e => setPublisher(e.target.value.toLowerCase())}
            /> 
            )}


           {productName && productCategory=='books' && (
              <FormInput
              required
              label="Year of Publication"
              type="text"
              maxLength ="4"
              //pattern="[0-9]"
              value={publicationYear}
              handleChange={e => setPublicationYear(e.target.value.toLowerCase())}
            /> 
            )}

            {productName && productCategory=='books' && (
              <FormInput
              label="ISBN-10"
              placeholder = "Only if the book has an ISBN-10 number"
              maxLength="10"
              //pattern="[0-9]"
              type="text"
              value={isbn10}
              handleChange={e => setIsbn10(e.target.value)}
            />
            )}



            {productName && productCategory=='books' && (
              <FormInput
              label="ISBN-13"
              placeholder = "Only if the book has an ISBN-13 number"
              maxLength="13"
              type="text"
              //pattern="[0-9]"
              value={isbn13}
              handleChange={e => setIsbn13(e.target.value)}
            />
            )}

       

        {productName && productCategory=='books' && (
           
           <h1> Plot Summary </h1>
          )}
         
        {productName && productCategory=='books' && (
          
             <CKEditor
             onChange={evt => setProductDesc(evt.editor.getData())}
           />
            )}

            
             
           

    
            <Button type="submit"  >
               Finish
            </Button>

          </form>
          
        </div>
      </Modal>
      
     

      <Modal2 {...configModal2}>

        <div className="updateProductImage">

          
         <form onSubmit = {handleSubmit2} >

          
          <label htmlFor="product-img"><h2>Product Image</h2></label>
 
              <Button onClick={triggerFileSelectPopup}>
                Choose an image
              </Button>

              <input 
                type="file" 
                name="product-img"
                className="productimginput" 
                onChange={productImgHandler} 
                ref ={inputRef} 
                style={{display:"none"}}
              />


              <div className="wrap">

                <div className="image-container">
      
                {
                  productImg  ? <img   src={imagePreview} ></img> : <img onClick={triggerFileSelectPopup} src={uploadImg}/> 
                }

                </div>
              </div> 

              <Button type='submit' className="btn">
                Finish
              </Button>

              <Button onClick={() => {setHideModal2(true); resetProductImg()}}>
                Close
              </Button>

         </form>

       </div>

      </Modal2>
      



      <div className="manageProducts">

        <table border="0" cellPadding="0" cellSpacing="0">
         <tbody>

            <tr>
              <th>
                <h1>
                  Beherawi's Catalog
                </h1>
              </th>
            </tr>

            <tr>

              <td>

            

                <table className="results" border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    {(Array.isArray(data) && data.length > 0) && data.map((product,index) => {
                      const {
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
                      

                      return (

                        <tr key={index}>
 
                          <td>
                            <img className="thumb" src={productThumbnail} />
                          </td>

                          <td>
                            Product Category : {productCategory} 
                          </td>

                          <td>
                            Type : {type}
                          </td>

                          <td>
                             Genres : {genres}
                          </td>

                          <td>
                            Subgenres : {subGenres}
                          </td>

              
                          <td>
                            Product Name : {productName} 
                          </td>

                          <td>
                             Language : {language}
                          </td>

                          <td>
                             Author's name : {author}
                          </td>

                          <td>
                            Number of pages : {printLength}
                          </td>
                          
                          <td>
                            Publisher : {publisher}
                          </td>


                          <td>
                            Year of Publication : {publicationYear}
                          </td>

                  
                          <td>
                           {isbn10 && 'ISBN-10 :'} {isbn10 && isbn10 }   
                          </td>

                          <td>
                          {isbn13 && 'ISBN-13 :'} {isbn13 && isbn13 }
                          </td>

                          <td>
                           {productDesc && ' Plot Summary :'} {productDesc&& (
                            <span
                            className="desc"
                            dangerouslySetInnerHTML={{ __html: productDesc }} />
                            )
                            }                            
                          </td>

                      

                          <td>
                            <Button onClick={() => dispatch(deleteProductStart(documentID))}>
                              Delete
                            </Button>
                          </td>

                          <td>
                            <Button onClick={() => toggleModal2(documentID)}>
                                Update Product Image
                            </Button>
                          </td>

                        </tr>  
                      )
                    })}

                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td>

              </td>
            </tr>
            
            <tr>

              <td>
                <table border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>
                        {!isLastPage && (
                          <LoadMore {...configLoadMore} />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              
            </tr>

          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Admin;