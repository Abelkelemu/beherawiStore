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
              +16412339905 |
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
            <a href="https://wa.me/+16412339905">
            <i class="fab fa-whatsapp"></i>
            </a>
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
          <p>Designed by Abel K Dessalegne (+16412339905)</p> 
          © 2021 Beherawi
          </div>
        </Link>
    
        
      </div>
    </footer>
  );
}

export default Footer;