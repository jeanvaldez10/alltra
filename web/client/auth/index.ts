import axios from "axios";
import { Constants } from "../constants";
import { FormDataType } from "../../@types";
export default class Auth {
    constructor() {

    }

    public async verify(token: string) {
        const response = await axios.get(`${Constants.API_BASE}/auth/verify`, {
            validateStatus: (status) => {
                // Consider any status code a valid response
                return true;
            },
            headers: {
                cookie: `access_token=${token}`
            }

        },);


        if (response.status !== 200) {
            return { code: 401, message: "Unauthorized" }
        }
        return { code: 200, message: "Authorized", data: response.data }
    }

    public async signup(form: FormDataType) {
        try {
            const response = await axios.post(`${Constants.API_BASE}/auth/signup`, { ...form, full_name: form.first_name + " " + form.last_name });
            return response
        } catch (err) {
            console.log(err);
            return { message: "Unexpected Error", code: 500, data: null }
        }
    }

    public async login(email: string, password: string) {
        try {
            console.log(`${Constants.API_BASE}`)
            const response = await axios.post(`${Constants.API_BASE}/auth`, { email, password }, { withCredentials: true });
            if (response.data.code !== 200) {
                return { code: 401, message: "Incorrect email or password" }
            }
            return { code: 200, message: "Logged In", user: response.data.user }
        } catch (err) {
            console.log(err);
            return { message: "Unexpected Error", code: 500 }
        }
    }

    public async checkEmail(email: string) {
        try {
            const response = await axios.post(`${Constants.API_BASE}/auth/check-email`, { email });
            return response.data
        } catch (err) {
            console.log(err)
            return { message: "Unexpected Error", code: 500 }
        }
    }

    public async logout() {
        return await axios.get(`${Constants.API_BASE}/logout`, { withCredentials: true })
    }
}