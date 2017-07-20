export default function isRedirect() {
    return sessionStorage.getItem('UEM_appId') !== null;
}