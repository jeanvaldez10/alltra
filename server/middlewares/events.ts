import { Events, User } from "../@types";

const main_middlewares_events = (data: any, user: User, next: (data: {
    e: Events;
    d: any;
}, user: User) => void) => {
    console.log(`user: ${user.username}, event type: ${data.e}`)

    next(data, user);
};

export default main_middlewares_events;