import React ,{useEffect}from 'react'

import './styles.scss'

//components
import Directory from "../../components/Directory";



const Homepage = props =>{
    return(
        <section class="homepage">
           <Directory/>
        </section>
    );
} 

export default Homepage