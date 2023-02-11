import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { useHistory, useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles.scss'


//components

import FilterSelect from '../forms/FilterSelect';


const HeaderThird = ({}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const {filterType} = useParams();



    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`);
    };


    const configFilters = {
        
        defaultValue : filterType,
        options: [
            {
                name: 'Fiction Books',
                value: 'fiction' ,
               
             },
             {
                name: 'All Fiction Books',
                value: 'fiction' ,
               
             },
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
                
              }
        ],
        handleChange: handleFilter
    };

    const configFiltersNonfiction = {
        defaultValue : filterType,
        options: [
            {
                name: 'Nonfiction Books',
                value: 'nonfiction' ,
               
             },

            {
           name: 'All Nonfiction Books',
           value: 'nonfiction' ,
          
        },{
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
            value: "ethiopian government textbooks for students",
            name: "Ethiopian Government Textbook For Students",
            
          },{
            value: "ethiopian reference books for students",
            name: "Ethiopian Reference Books For Students",
          },
          
          {
            value: "families and relationships",
            name: "Families And Relationships",
            
          },{
            value: "health o5 fitness",
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
    ],
        handleChange: handleFilter
    };

    return(
        <div className="products">
           
           <div className="mainFilters">
               <ul>
                   <li>
                     <div className="filterSelect">
                     <FilterSelect {...configFilters} />
                     </div>
                   
                   </li>
                   <li>
                     <div className="filterSelect">
                   <FilterSelect {...configFiltersNonfiction} />
                   </div> 
                   </li>
               </ul>
           
           
           
           </div>           
        
        </div>
    )


}

export default HeaderThird