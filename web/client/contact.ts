import axios from "axios"
import { ContactFormType } from "../@types"
import { Constants } from "./constants"

interface ContactResponse  {
    isValid: boolean,
    message: string,
    code: number,
    data?:ContactFormType
}

export default async function ContactSubmit(formData: ContactFormType): Promise<ContactResponse> {
    if (!formData.email || !formData.phone || !formData.name || !formData.message) {
        return {isValid: false, message: "Invalid Form, There is a missing data in the form", code: 404}
    }

    try {
        const response = await axios.post(`${Constants.API_BASE}/contact`, formData, {withCredentials: true});

        if (response.data.code !== 200) {
            return {isValid: false, ...response.data as {message: string, code: number}};
        }
        return {isValid: true, ...response.data as {message: string, code: number, data: ContactFormType}}
    } catch(err) {
        return {isValid: false, message: "Unexpected Error", code: 500}
    }

}