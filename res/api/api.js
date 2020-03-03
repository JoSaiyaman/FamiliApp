import {login} from './calls/login';
import {register_user} from './calls/register_user';
import {get_groups_qr} from './calls/get_groups_qr';
export const api = {

    login: login,
    register_user: register_user,
    get_groups_qr: get_groups_qr

};