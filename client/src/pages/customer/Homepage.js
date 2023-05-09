import { Helmet } from 'react-helmet-async';

import HomepageView from '../../sections/customer/view/HomepageView';


const Homepage = () => {
    

    return (
        <>
          <Helmet>
            <title>Home</title>
          </Helmet>
    
         <HomepageView />
        </>
      );
}


export default Homepage;

