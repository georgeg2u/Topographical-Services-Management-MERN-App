import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// sections
import ServicePageView from '../../sections/customer/view/ServicePageView';

// ----------------------------------------------------------------------

export default function ServicePage() {
  const { id } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function fetchServiceData() {
      try {
        const response = await fetch(`http://localhost:8080/api/services/${id}`);
        if (!response.ok) {
          throw new Error('Could not fetch details for selected service');
        }
        const data = await response.json();
        setServiceData(data);
      } catch (error) {
        setError(error);
      }
    }
    fetchServiceData();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{serviceData && serviceData.title}</title>
      </Helmet>

  
      {error && <p>{error.message}</p>}
      {serviceData && <ServicePageView data={serviceData} />}
    </>
  );
}
