class ApiClient {
    constructor(request) {
        this.request = request;
    }

    async getUsers(page = 1, perPage) {
        const params = { page };

        if (perPage !== undefined) {
            params.per_page = perPage;
        }

        return this.request.get('/api/users', {
            params
        });
    }

    async getUser(id) {
        return this.request.get(`/api/users/${id}`);
    }

    async createUser(user) {
        return this.request.post('/api/users', {
            data: user
        });
    }

    async updateUser(id, user) {
        return this.request.put(`/api/users/${id}`, {
            data: user
        });
    }

    async patchUser(id, user) {
        return this.request.patch(`/api/users/${id}`, {
            data: user
        });
    }

    async deleteUser(id) {
        return this.request.delete(`/api/users/${id}`);
    }

    async login(credentials) {
        return this.request.post('/api/login', {
            data: credentials
        });
    }

    async register(credentials) {
        return this.request.post('/api/register', {
            data: credentials
        });
    }
}

module.exports = { ApiClient };