import React from 'react'
import './header.scss'

export const Header: React.FC = () => {
 
    return(
        <header className='header'>
            <div className='container header__container'>
                <h1>Tic Tac Toe</h1>
            </div>
        </header>
    )
};