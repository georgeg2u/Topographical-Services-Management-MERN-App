import { add } from 'date-fns';
//
import _mock from '../_mock';
import { jobContent } from '../assets';

// ----------------------------------------------------------------------

export const _jobs = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  companyName: _mock.company(index),
  companyLogo: _mock.image.company(index),
  slug: _mock.text.serviceTitle(index),
  // category: _mock.text.serviceCategories(index),
  createdAt: new Date(),
  deadline: add(new Date(), { months: index }),
  location: _mock.address.county(index),
  type: (index % 2 && '30 zile') || (index % 4 && '14 zile') || '60 zile',
  price: (index % 3 && 1000) || '2000',
  languages: ['Russian', 'Spanish', 'English'],
  views: 286,
  favorited: index === 2 || index === 4 || false,
  locationMap: [
    {
      address: _mock.address.fullAddress(index),
      phoneNumber: _mock.phoneNumber(index),
      email: _mock.email(index),
      latlng: [33, 65],
    },
  ],
 
  content: jobContent,
  shareLinks: _mock.shareLinks,
}));

// ----------------------------------------------------------------------

export const _jobsByCompanies = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  companyName: _mock.company(index),
  companyLogo: _mock.image.company(index),
  totalJobs: 101 + index,
}));

// ----------------------------------------------------------------------

const NAMES = [
  'Accounting / Finance',
  'Marketing',
  'Design',
  'Development',
  'IT - Hardware',
  'Customer Service',
  'Health and Care',
  'Banking',
];

const ICONS = [
  '/assets/icons/ic_money.svg',
  '/assets/icons/ic_marketing_bullhorn.svg',
  '/assets/icons/ic_creativity.svg',
  '/assets/icons/ic_web_programming.svg',
  '/assets/icons/ic_chip.svg',
  '/assets/icons/ic_customer_service.svg',
  '/assets/icons/ic_stethoscope.svg',
  '/assets/icons/ic_banking.svg',
];

export const _jobsByCategories = [...Array(8)].map((_, index) => ({
  id: _mock.id(index),
  name: NAMES[index],
  icon: ICONS[index],
  totalJobs: 101 + index,
}));

// ----------------------------------------------------------------------

export const _jobsByCountries = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  location: _mock.address.country(index),
  totalJobs: 101 + index,
  coverImg: _mock.image.travel(index),
}));
