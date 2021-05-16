import { PermissionsAndroid } from "react-native";
export default async function requestCameraAndAudioPermission() {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        if (
            granted["android.permission.CAMERA"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
            granted["android.permission.READ_EXTERNAL_STORAGE"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
            granted["android.permission.WRITE_EXTERNAL_STORAGE"] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
            console.log("You can use the cameras & mic");
        } else {
            console.log("Permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
}