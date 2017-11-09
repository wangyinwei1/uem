// import cookies from './cookies';

function themeChange(colorName,theme){
    // const theme = localStorage.getItem('UEM_skin');
    if (theme) {
        const newColor = echartColor[colorName][theme];
        if (newColor) {
            return newColor;
        } else {
            console.error(`未找到 "${colorName}" 的 "${theme}" 的对应颜色`);
            return colorName;
        }
    } else {
        // console.error(`未找到 "${colorName}" 中的 "${theme}" `);
        return colorName;
    }
}
window.themeChange = themeChange;