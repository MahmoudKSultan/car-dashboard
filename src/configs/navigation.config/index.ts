import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
    {
        key: 'clientsMenu',
        path: '',
        title: 'قسم العملاء',
        translateKey: 'nav.clientsMenu.clientsMenu',
        icon: 'collapseMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'clientsMenu.clientsList',
                path: '/clients',
                title: 'جدول العملاء',
                translateKey: 'nav.clientsMenu.item1',
                icon: 'clients',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'clientsMenu.createClient',
                path: '/clients/create-client',
                title: 'انشاء عميل',
                translateKey: 'nav.clientsMenu.item2',
                icon: 'createClient',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'clientsMenu.createService',
                path: '/clients/create-service',
                title: 'انشاء خدمة',
                translateKey: 'nav.clientsMenu.item3',
                icon: 'createService',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
]

export default navigationConfig
