import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from '@mui/material/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/fontawesome-free-solid'
import React ,{useState,useRef,useEffect} from "react"
import { NavLink } from 'react-router-dom';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import { useSelector ,useDispatch} from 'react-redux';
import { Table } from '@mui/material';
import {DLT} from "../redux/action/action"

function Header() {

  const [price,setPrice] = useState(0);

  const getdata = useSelector(state => state.carts);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const dispatch = useDispatch();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const dlt = (id)=>{
    dispatch(DLT(id))
}

const total=()=>{
  let price=0;
  getdata.map((ele,k)=>{
    return price = ele.price*ele.qnty + price
  },[total])
  setPrice(price)
}

useEffect(()=>{
  total()
})


  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
        <Container>
          <NavLink to="/" className='text-decoration-none text-light mx-3'>Add to Cart</NavLink>
          <Nav className="me-auto">
            <NavLink to="/cardDetails" className='text-decoration-none text-light'>Home</NavLink>

          </Nav>
          <Badge badgeContent={getdata.length} color="primary" fontSize={5}
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <FontAwesomeIcon icon={faShoppingCart} style={{ color: "white", fontSize: 25, cursor: "pointer" }} />
          </Badge>

        </Container>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>

                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {
                    getdata.length ?
                      <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                        <Table>
                          <thead>
                            <tr>
                              <th>Photo</th>
                              <th>Restaurent Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              getdata.map((e) => {
                                return (
                                  <>
                                    <tr>
                                      <td>
                                        <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                          <img src={e.imgdata} style={{ width: "5rem", height: "5rem" }} alt="" />
                                        </NavLink>
                                      </td>
                                      <td>
                                        <p>{e.rname}</p>
                                        <p>Price : ₹{e.price}</p>
                                        <p>Quantity : {e.qnty}</p>
                                        <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}>
                                          <i className='fas fa-trash smalltrash'></i>
                                        </p>
                                      </td>

                                      <td className='mt-5' style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}>
                                        <i className='fas fa-trash largetrash '></i>
                                      </td>
                                      
                                    </tr>
                                    
                                  </>
                                )
                              })
                            }
                            <p className='text-center'>Total :₹ {price}</p>
                          </tbody>
                        </Table>

                      </div> :
                      <div className='card-details d-flex justify-content-center align-items-center' style={{ width: "20rem" }}>
                        <i className='fas fa-close smallClose'
                          onClick={handleClose}
                          style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}></i>
                        <p style={{ fontSize: 22 }} >Your Cart is empty</p>
                        <img src='../cart.gif' alt='' className='emptycart_img' style={{ width: "5rem", padding: 10 }} />
                      </div>

                  }

                </MenuList>

              </Paper>
            </Grow>
          )}
        </Popper>

      </Navbar>
    </>
  )
}

export default Header