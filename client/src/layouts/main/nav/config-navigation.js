// routes
import {paths} from "../../../../src/routes/paths";

// ----------------------------------------------------------------------

export const navConfig = [
  {title: "Acasă", path: "/"},
  {title: "Servicii", path: paths.services},
  {
    title: "Despre",
    path: paths.about,
  },
  {title: "Contact", path: paths.contact},
];

export const pageLinks = [
  {
    subheader: "Pagini",
    cover: "/assets/images/menu/menu_career.jpg",
    items: [
      {title: "Acasă", path: "/"},
      {title: "Servicii", path: paths.services},
      {
        title: "Despre",
        path: paths.about,
      },
      {title: "Contact", path: paths.contact},
    ],
  },
];

export const footerMobileNav = [
  {
    title: "Pages",
    children: [pageLinks[0]],
  }
]
