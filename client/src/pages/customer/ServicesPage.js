import { Helmet } from 'react-helmet-async';
// sections
import ServicesPageView from '../../sections/customer/view/ServicesPageView';
import { CustomerDataProvider } from '../../context/CustomerDataContext';


// ----------------------------------------------------------------------

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Servicii</title>
      </Helmet>
    <CustomerDataProvider>
      <ServicesPageView />

    </CustomerDataProvider>
    </>
  );
}
