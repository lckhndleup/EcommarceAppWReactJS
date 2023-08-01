import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../Context/AuthContext";
import { useBasket } from "../../Context/BasketContext"; 

function Navbar() {
  const { loggedIn,user } = useAuth(); 

  const {items} = useBasket();

 
  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <NavLink to="/"><h1>E-Commarce</h1></NavLink>
          </div>

          <ul className={styles.menu}>
            <li>
              <NavLink to="/">Products</NavLink>
            </li>
          </ul>
        </div>

        <div className={styles.right}>
          {
            !loggedIn &&( 
              <React.Fragment>
                <NavLink to="/signin">
                  <Button colorScheme="pink">Sign in</Button>
                </NavLink>

                <NavLink to="/signup">
                  <Button colorScheme="red">Sign Up</Button>
                </NavLink>
              </React.Fragment>
            )
          }
          
          
          {
            loggedIn && (
              <React.Fragment>
                {
                  items.length > 0 && (
                    <NavLink to='/basket'>
                        <Button colorScheme="pink" variant={"outline"}>Basket ({items.length}) </Button>
                    </NavLink>
                  )
                }


              
                {
                  user?.role === 'admin' && (
                    <NavLink to='/admin'> 
                      <Button colorScheme="pink" variant='ghost'>Admin</Button> 
                    </NavLink>
                  )
                }
               

                  <NavLink to='/profile'>
                  <Button colorScheme="blue">Profile </Button>
                </NavLink>
              </React.Fragment>
            )
          }
          

        </div>
      </nav>
    </div>
  );
}

export default Navbar;
