import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {ReactComponent as OffersIcon} from '../assets/svg/localOfferIcon.svg'
import {ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import {ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg'
import { getAuth } from 'firebase/auth'

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const pathMatch = (route) => {
        if(location.pathname === route) {
            return true;
        }
    }

    const auth = getAuth();

    const onClickProfile = () => {
        if(auth.currentUser) {
            navigate('/profile');
        } else {
            navigate('/sign-in');
        }
    }

  return (
    <footer className='navbar'>
        <nav className="navbarNav">
            <ul className="navbarListItems">
                <li className="navbarListItem" onClick={() => navigate('/')}>
                    <ExploreIcon fill={pathMatch('/') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px'/>
                    <p className={pathMatch('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Explore</p>
                </li>
                <li className="navbarListItem" onClick={() => navigate('/offers')}>
                    <OffersIcon fill={pathMatch('/offers') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px'/>
                    <p className={pathMatch('/offers') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Offer</p>
                </li>
                <li className="navbarListItem" onClick={onClickProfile}>
                    <PersonOutlineIcon fill={pathMatch('/profile') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px'/>
                    <p className={pathMatch('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Profile</p>
                </li>
            </ul>
        </nav>
    </footer>
  )
}

export default Navbar