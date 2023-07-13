import { _office } from "../../../_mock/assets";
import ContactMap from "../../../components/map";
import ContactInfo from "../contact/ContactInfo";

export default function ContactPageView() {
  return (
    <>
      <ContactInfo />

      <ContactMap offices={_office} companyName={_office[0].address}/>
    </>
  );
}
