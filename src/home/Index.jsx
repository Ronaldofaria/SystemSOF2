import React from 'react';

import { accountService } from '@/_services';

import MyImage from '@/images/Safira.png';

function Home() {
    const user = accountService.userValue;
    return (
        <div className="responsive bg-dim full-bg-size">                  
            <img src={MyImage} style={{width: '100%', height: '100%'}} resizeMode="contain" alt=""/> 
        </div>
    );
}

export { Home };