function getCookies() {
    const cookies = {};
    document.cookie.split('; ').forEach(item => {
        const kv = item.split('=');
        const key = kv[0];
        const value = kv[1];
        cookies[key] = value;
    });
    return cookies;
}

const _cookies = getCookies();

class Cookies {
    // 获取 cookie
    getItem(key) {
        return _cookies[key];
    }
    // 设置 cookie 
    setItem(key, value) {
        _cookies[key] = value;
    }
    // 移除 cookie
    removeItem(key) {
        const exp = new Date();
        exp.setTime(exp.getTime() - 1);
        const value = this.getItem(key);
        if (cval !== null) {
            document.cookie = key + "=" + value + ";expires=" + exp.toGMTString();
        }
    }
}

const cookies = new Cookies();

export default cookies;