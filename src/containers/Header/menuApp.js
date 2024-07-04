export const adminMenu = [
    { //admin
        name: 'menu.admin.manage', menus: [

            { name: 'menu.admin.crud-user', link: '/system/user-manage' },
            { name: 'menu.admin.crud-user-redux', link: '/system/user-manage-redux' },
            { name: 'menu.admin.doctor', link: '/system/doctor-manage' },
            { name: 'menu.admin.manage-schedule-doctor', link: '/system/manage-schedule-doctor' },
        ],
    },
    {
        name: 'menu.admin.clinic', menus: [

            { name: 'menu.admin.clinic-manage', link: '/system/clinic-manage' }
        ],

    },
    {
        name: 'menu.admin.specialty', menus: [

            { name: 'menu.admin.specialty-manage', link: '/system/specialty-manage' }
        ],
    },
    {
        name: 'menu.admin.handbook', menus: [

            { name: 'menu.admin.handbook-manage', link: '/system/handbook-manage' }
        ]
    }
];

export const doctorMenu = [
    {//DOCTOR MENU
        name: 'menu.doctor.manage', menus: [
            { name: 'menu.doctor.manage-schedule-doctor', link: '/doctor/manage-schedule-doctor' },
        ],
    },

];