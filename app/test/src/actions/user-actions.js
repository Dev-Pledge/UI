import $ from 'jquery';

export const UPDATE_USER = 'users:updateUser';
export const SHOW_ERROR = 'users:showError';

export function updateUser(newUser) {
    return {
        type: UPDATE_USER,
        payload: {
            user: newUser
        }
    };
}

export function showError() {
    return {
        type: SHOW_ERROR,
        payload: {
            user: 'ERROR!!'
        }
    }
}

export function apiRequest() {
    return dispatch => {
        $.ajax(
            {
                method: 'POST',
                url: 'http://dev.auth.devpledge.com/auth/login',
                data: {'username': 'tom', 'password': 'password'},
                success(resp) {
                    console.log('SUCCESS');
                    console.log(resp);
                },
                error() {
                    console.log('ERROR');
                    dispatch(showError());
                }
            }
        )
    }
}