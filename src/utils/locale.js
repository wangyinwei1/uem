import cookies from './cookies';

function locale(text) {
    const lang = cookies.getItem('language');
    if (lang) {
        const newText = UEM_i18n[lang][text];
        if (newText) {
            return newText;
        } else {
            console.error(`[i18n]: 未找到 "${text}" 的 "${lang}" 国际化文本`);
            return text;
        }
    } else {
        return text;
    }
}
window.locale = locale;