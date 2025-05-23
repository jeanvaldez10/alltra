import { headers } from "next/headers"
import { User } from "../../../@types";

const getUser = async () => {
    const header = await headers();
    const user: User | null  = JSON.parse(header.get("x-user-info") as string);
    return user;
}

export default getUser;