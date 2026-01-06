import { Routes } from '@angular/router';


// Home
import { Home } from './home/home';

import { Usercomponent } from './crud/usercomponent/usercomponent' ;
import { Usersinfo } from './crud/usersinfo/usersinfo' ;
import { Usersupabase } from './crud/usersupabase/usersupabase' ;

// Sales
import { Salesman } from  './portfoliomenu/salesman/salesman';
import { Salesseo } from  './portfoliomenu/salesseo/salesseo';
import { Salesmandtl } from  './portfoliomenu/salesmandtl/salesmandtl';
import { Salesmanyr } from  './portfoliomenu/salesmanyr/salesmanyr';

// Info
import { About } from './info/about/about';


export const routes: Routes = [

    { path: '', component: Home },  // Home

    { path: 'home', loadComponent: () => import('./home/home').then(m => m.Home) },

    // User
    { path: 'usercomponent', component: Usercomponent }, 
    { path: 'usersinfo', component: Usersinfo }, 
    { path: 'usersupabase', component: Usersupabase }, 



    // in a lazy module
    // { path: '', loadChildren: () => import('./home/home').then(m => m.Home) },
    { path: 'salesman', component: Salesman }, 
    { path: 'salesseo', component: Salesseo }, 
    { path: 'salesmandtl', component: Salesmandtl }, 
    { path: 'salesmanyr', component: Salesmanyr  }, 


    // Info
    { path: 'about', component: About }, 
    
    { path: '**', component: Home }

];
