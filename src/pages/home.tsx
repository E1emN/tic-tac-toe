import React from 'react';
import { Game } from '../components/Game/game';
import { Header } from '../components/Header/header';

const HomePage: React.FC = () => {
    return(
        <>
            <Header />
            <Game />
        </>
    )
};

export default HomePage;