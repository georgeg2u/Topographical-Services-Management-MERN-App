import { Helmet } from 'react-helmet-async';
// sections
import ServicesPageView from '../../sections/customer/view/ServicesPageView';


// ----------------------------------------------------------------------

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Servicii</title>
      </Helmet>

      <ServicesPageView />
    </>
  );
}
