import httpService from "./httpService";
import localStorageServise from "./localStoreg.service";

const userEndpoint = "user/";

const userService = {
    get: async () => {
        const {
            data
        } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(userEndpoint + payload._id, payload);
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndpoint + localStorageServise.getUserId()
        );
        return data;
    },
    update: async (id, content) => {
        console.log(content);
        const { data } = await httpService.put(userEndpoint + id, content);
        return data;
    }
};

export default userService;
