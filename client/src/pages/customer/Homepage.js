import { Helmet } from 'react-helmet-async';

import HomepageView from '../../sections/customer/view/HomepageView';


const Homepage = () => {
    

    return (
        <>
          <Helmet>
            <title>Acasă</title>
          </Helmet>
    
         <HomepageView />
        </>
      );
}


export default Homepage;

