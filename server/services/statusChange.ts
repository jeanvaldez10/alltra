import { Events } from "../@types";
import core from "../src";


const statusChangeAction = (data) => {
    core.users.forEach((u) => {
        u.socket.send(JSON.stringify({
            e: Events.MEMBER_STATUS_CHANGE,
            d: data
        }));
    });
}

export default statusChangeAction;