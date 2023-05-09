import { Helmet } from 'react-helmet-async';
import AboutPageView from '../../sections/customer/view/AboutPageView'

// ----------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>Despre noi</title>
      </Helmet>

      <AboutPageView />
    </>
  );
}
