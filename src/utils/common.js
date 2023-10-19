import jwtDecode from 'jwt-decode';
import EncryptedStorage from 'react-native-encrypted-storage';

 export const  setToken = async(token) => {
    try {
        await EncryptedStorage.setItem(
            "token",token
        );

    } catch (error) {
        return error;
    }
}

export const getToken = async () => {
    try {
        const session = await EncryptedStorage.getItem("token");
        if (session !== undefined) {
            return session;
        }
    } catch (error) {
        return error;
    }
}
export const removeToken = async () => {
    try {
        await EncryptedStorage.removeItem("token");
    } catch (error) {
        return error;
    }
}

export const User = async() =>{
    const token = await getToken();
    const User = jwtDecode(token);
    return User;
}

// async function clearStorage() {
//     try {
//         await EncryptedStorage.clear();
//     } catch (error) {
//     }
// }