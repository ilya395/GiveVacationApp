const routesConfig = {
    home: {
        title: 'Главная',
        url: '/',
    },
    users: {
        title: 'Пользователи',
        url: '/users',
    },
    user: {
        title: 'Пользователь',
        url: '/user/:id',
    },
    ['new-user']: {
        title: 'Пользователи',
        url: '/user/new-user',
    },
    vacations: {
        title: 'Отпуска',
        url: '/vacations'
    },
    vacation: {
        title: 'Отпуск',
        url: '/vacation/:id'
    },
    ['new-vacation']: {
        title: 'Новый отпуск',
        url: '/vacation/new-vacation'
    },
    departments: {
        title: 'Отделы',
        url: '/departments'
    },
    department: {
        title: 'Отдел',
        url: '/department/:id'
    },
    ['new-department']: {
        title: 'Новый отдел',
        url: '/department/new-department'
    },
}

export default routesConfig;