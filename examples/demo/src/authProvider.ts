import { AuthProvider } from 'react-admin';

const authProvider: AuthProvider = {
    login: ({ username }) => {
        localStorage.setItem('username', username);
        // accept all username/password combinations
        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
        localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.reject('Unknown method'),
    getIdentity: () =>
        Promise.resolve({
            id: 'user',
            fullName: 'Under Water World',
            avatar:
                '',
        }),
};

export default authProvider;
