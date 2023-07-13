import {Helmet} from "react-helmet-async";
import ContactPageView from "../../sections/customer/view/ContactPageView";

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact</title>
      </Helmet>

      <ContactPageView />
    </>
  );
}
