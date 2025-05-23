import {Events} from '../@types/index'
import statusChangeAction from '../services/statusChange';

const MemberStatusChange = {
    event: Events.MEMBER_STATUS_CHANGE,
    action: statusChangeAction
}

export default MemberStatusChange;