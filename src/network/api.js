const API_ADDRESS = 'http://47.110.231.83/app/api/v1';

function fetchAction(...props) {
    this.url = props.shift(1);
    this.options = props.shift(1);
    return fetch(this.url, Object.assign({}, this.options))
        .then((response) => response.json());
}
export default {
    postSendSms(data) {
        return fetchAction(`${API_ADDRESS}/user/sendSms`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        });
    },
    postFindUser(data) {
        return fetchAction(`${API_ADDRESS}/user/findUser`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        });
    },
    postGetUserCurrency(jwtToken,data) {
        return fetchAction(`${API_ADDRESS}/account/getUserCurrency`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'jwtToken':jwtToken
            },
            body: JSON.stringify(data),
        });
    },
    postGetTransactionList(jwtToken,data) {
        return fetchAction(`${API_ADDRESS}/account/getTransactionList`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'jwtToken':jwtToken
            },
            body: JSON.stringify(data),
        });
    },
    postInsertPhoneUser(Cookie,data) {
        return fetchAction(`${API_ADDRESS}/user/insertPhoneUser`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'Cookie':'JSESSIONID='+Cookie
            },
            body: JSON.stringify(data),
        });
    },
    postGetWithdrawFee(jwtToken,data) {
        return fetchAction(`${API_ADDRESS}/account/getWithdrawFee`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'jwtToken':jwtToken
            },
            body: JSON.stringify(data),
        });
    },
    postWithdrawSendSms(jwtToken,data) {
        return fetchAction(`${API_ADDRESS}/account/withdrawSendSms`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'jwtToken':jwtToken,
            },
            body: JSON.stringify(data),
        });
    },
    postWithdraw(jwtToken,Cookie, data) {
        return fetchAction(`${API_ADDRESS}/account/withdraw`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'jwtToken':jwtToken,
                'Cookie':'JSESSIONID='+Cookie
            },
            body: JSON.stringify(data),
        });
    },
    postGetAddress(jwtToken,data) {
        return fetchAction(`${API_ADDRESS}/account/getAddress`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'jwtToken':jwtToken,
            },
            body: JSON.stringify(data),
        });
    },
    postForgetLogin(Cookie,data) {
        return fetchAction(`${API_ADDRESS}/user/forgetLogin`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'Cookie':'JSESSIONID='+Cookie
            },
            body: JSON.stringify(data),
        });
    },
    postForgetTransaction(Cookie,data) {
        return fetchAction(`${API_ADDRESS}/user/forgetTransaction`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'Cookie':'JSESSIONID='+Cookie
            },
            body: JSON.stringify(data),
        });
    },
    postLogout(jwtToken,data) {
        return fetchAction(`${API_ADDRESS}/user/logout`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'jwtToken':jwtToken
            },
            body: JSON.stringify(data),
        });
    },
}