const backendDomain = "http://localhost:8000"

const SummaryApi = {
    signUp: {
        url: `${backendDomain}/api/auth/signup`,
        method: "post"
    },
    login: {
        url: `${backendDomain}/api/auth/login`,
        method: "post"
    },
    logout: {
        url: `${backendDomain}/api/auth/logout`,
        method: "post"
    },
    getSidebarConv: {
        url: `${backendDomain}/api/users/`,
        method: "get"
    },
    sendMessage: {
        url: `${backendDomain}/api/messages/send/`,
        method: "post"
    },
    getMessages: {
        url: `${backendDomain}/api/messages/`,
        method: "get"
    },
    userDetail: {
        url: `${backendDomain}/api/users/user-details`,
        method: "get"
    },
    updateUser: {
        url: `${backendDomain}/api/users/update-user`,
        method: "post"
    }
};

export default SummaryApi;