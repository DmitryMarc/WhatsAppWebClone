export const getCartFromLocalStorage = () => {
    const data = localStorage.getItem('auth');
    return data ? JSON.parse(data) : null;
}