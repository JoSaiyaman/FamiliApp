import {createStore} from 'redux';
import {reducer} from './main_reducer';

export const store = createStore(reducer);