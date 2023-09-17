'use client';

import react from 'react';
import { HeaderContainer } from './header-styles';


const Header = () => {
    return (
        <HeaderContainer>
            <p className='title'>
                DashboardApp 
            </p>
            <div className='items__container'>
                <p className='item__header'>
                    Home
                </p>
                <p className='item__header'>
                    Dashboard
                </p>
                <p className='item__header'>
                    About
                </p>
            </div>
        </HeaderContainer>
    );
}

export default Header;