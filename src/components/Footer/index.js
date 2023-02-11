import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const Footer = props => {
  return (

    <footer className="footer">
      <div className="footerWrap">

        <div className="contactUs">

          <ul>

            <li>
              Customer Service
            </li>

            <li>
              +251 929 451813 |
            </li>

            <li>
             +251 946 725729
            </li>

          </ul>
           
                
        </div>

        <div className="socialMedia">

          <ul>

            <li>
              Connect With Us
            </li>

            <li>
              <a href="https://t.me/BeherawiStore">
              <i class="fab fa-telegram"></i>
              </a>
                
              
            </li>

            <li>
              <a href="https://www.instagram.com/beherawistore/">
              <i class="fab fa-instagram"></i>
              </a>
            </li>

            {/* <li>
              <Link>
                Facebook
              </Link>
            </li> */}
            
            <li>
            <a href="https://wa.me/+33749671000">
            <i class="fab fa-whatsapp"></i>
            </a>
            </li>

          </ul>
                      
        </div>

        <div className="privacyPolicy" >

          <ul>
{/* 
            <li>
              <Link>
              Privacy Policy  |
              </Link>
            </li>
              
            <li>
              <Link>
              Terms of Use
              </Link>
            </li> */}

          </ul>
       
        </div>
        
        
        
        <Link to="/">
          <div className="copyright" >
          <p>Designed by Easy IT Solutions (+251 946725729)</p> 
          © 2021 Beherawi.com
          </div>
        </Link>
    
        
      </div>
    </footer>
  );
}

export default Footer;