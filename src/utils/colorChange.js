import cookies from './cookies';

function colorChangeTest(colorName){
    const theme = localStorage.getItem('UEM_skin');
    if (theme) {
        const newColor = echartColor[colorName][theme];
        if (newColor) {
            return newColor;
        } else {
            console.error(`[i18n]: 未找到 "${colorName}" 的 "${theme}" 的对应颜色`);
            return colorName;
        }
    } else {
        return colorName;
    }
}
window.colorChangeTest = colorChangeTest;