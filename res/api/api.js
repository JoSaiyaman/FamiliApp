import {login, verifyOtpCode, requestOtpCode} from './calls/login';
import {register_user} from './calls/register_user';
import {get_groups_qr} from './calls/get_groups_qr';
import {get_user_groups} from './calls/groups';
import {post_ecard} from './calls/ecards';
import {updateOwnUserData, getGroupsMembers} from './calls/users';
import {getGroupMemberLocations} from './calls/locations';
export const api = {

    login: login,
    requestOtpCode: requestOtpCode,
    verifyOtpCode: verifyOtpCode,
    updateOwnUserData: updateOwnUserData,
    register_user: register_user,
    get_groups_qr: get_groups_qr,
    getGroupMemberLocations: getGroupMemberLocations,
    getGroupsMembers,
    post_ecard,
    getUserGroups: get_user_groups

};