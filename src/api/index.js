import axios from "axios";
import {groupsPath} from "../constants/api";

export const API = {
    async getGroups() {
        try {
            const result = await axios({
                url: groupsPath,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return result.data;
        } catch (err) {
            throw err.response.data.error.errors;
        }
    },

    async authorize(data) {
        try {
            /*const result = await axios({
                url: groupsPath,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });*/
            console.log('data', data);
            return true;
        } catch (err) {
            throw err.response.data.error.errors;
        }
    }
}