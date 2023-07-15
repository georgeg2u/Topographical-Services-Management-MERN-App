import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FolderIcon from '@mui/icons-material/Folder';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
export const mainNavbarItems = [
    {
        id: 0,
        icon: <HomeIcon />,
        label: 'Acasă',
        route: '/company',
    },
    {
        id: 2,
        icon: <CreateNewFolderIcon />,
        label: 'Adaugă serviciu',
        route: 'company/add-service',
    },
    {
        id: 1,
        icon: <FolderIcon />,
        label: 'Serviciile mele',
        route: 'company/services',
    },
    {
        id: 4,
        icon: <PendingActionsIcon />,
        label: 'Contractele mele',
        route: 'company/contracts',
    },
    {
        id: 3,
        icon: <ManageAccountsIcon />,
        label: 'Setări cont',
        route: 'company/settings',
    },
]