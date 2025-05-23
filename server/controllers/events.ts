import { Events, User } from "../@types";
import MessageCreateEvent from "../events/MessageCreate";
import PageChangeEvent from "../events/PageChange";
import MessageUpdate from "../events/MessageUpdate";
import MessageDelete from "../events/MessageDelete";
import DirectMessageCreate from "../events/DirectMessageCreate";

export default function WebsocketEventsController(data: {e: Events, d: any}, user: User) {
    switch (data.e) {
        case Events.MESSAGE_CREATE:
            MessageCreateEvent.action(data.d, user);
            break;
        case Events.PAGE_CHANGE:
            PageChangeEvent.action(data.d, user.id);
            break;
        case Events.MESSAGE_UPDATE:
            MessageUpdate.action(data.d, user);
            break;
        case Events.MESSAGE_DELETE:
            MessageDelete.action(data.d);
            break;
        case Events.DIRECT_MESSAGE_CREATE:
            DirectMessageCreate.action(data.d, user);
            break;
        default:
            break;
    }
}