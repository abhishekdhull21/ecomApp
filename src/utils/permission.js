import React from 'react';
import {
  PermissionsAndroid
} from 'react-native';

export const requestPermission = async (permission) => {
    try {
        if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS[permission])) {
            return true;
        }
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS[permission]
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
               return true;
            } else {
                return false;
            }
        
    } catch (err) {
        console.warn(err);
    }
}