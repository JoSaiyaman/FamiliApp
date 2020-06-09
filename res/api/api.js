import {login, verifyOtpCode, requestOtpCode} from './calls/login';
import {register_user} from './calls/register_user';
import {get_groups_qr} from './calls/get_groups_qr';
import {get_user_groups} from './calls/groups';
import {post_ecard} from './calls/ecards';
import {create_wishlist} from './calls/wishlist';
import {get_user_wishlists} from './calls/wishlist';
import {get_family_wishlists} from './calls/wishlist';
import {get_family_members} from './calls/get_family_members';
import {create_emergency, deactivate_emergency, get_emergencies} from './calls/emergency';
import {updateOwnUserData, getGroupsMembers, get_user_profile} from './calls/users';
import {createLocation} from './calls/locations';
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
    getUserGroups: get_user_groups,
    getUserWishlists: get_user_wishlists,
    createWishlist: create_wishlist,
    getFamilyMembers:get_family_members,
    getFamilyWishlists: get_family_wishlists,
    createLocation,
    createEmergency: create_emergency,
    deactivateEmergency: deactivate_emergency,
    getEmergencies: get_emergencies,
    getUserProfile: get_user_profile

};