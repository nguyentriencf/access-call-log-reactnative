import CallLogs from 'react-native-call-log';
import React from 'react';
import {Text, View, Button, Alert,Platform,PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const HelloWorldApp =  () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button
        title="Giao hàng thành công"
        onPress={() => componentDidMount('0909190011')}
      />
      <Button
        title="Giao hàng thất bại"
        onPress={() => componentDidMount('0909190012')}
      />
      <Button title="Chụp hình nhận hàng" onPress={() => captureImage()} />
    </View>
  );
};

export default HelloWorldApp;

componentDidMount = async (phoneNumbers) => {
  try {
    const filter = {
      phoneNumbers: phoneNumbers, // (String or an Array of String)
      // if this filter is set, load(limit, filter) will only return call logs for this/these phone numbers
    };
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      {
        title: 'Xác nhận thông tin',
        message: 'Cho phép truy cập lịch sử cuộc gọi',
        buttonNeutral: 'Để sau',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log(CallLogs);
      CallLogs.load(5,filter).then(c => console.log(c));
    } else {
      console.log('Call Log permission denied');
    }
  } catch (e) {
    console.log(e);
  }
};


const requestCameraPermission = async () => {
  const Rationale = {
    title: 'image picker camera',
    message: 'permission camera',
  };
 
  if (Platform.OS === 'android') {
   try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  }

 const requestExternalWritePermission = async () => {
   if (Platform.OS === 'android') {
     try {
       const granted = await PermissionsAndroid.request(
         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,

         {
           title: 'External Storage Write Permission',

           message: 'App needs write permission',
         },
       );

       // If WRITE_EXTERNAL_STORAGE Permission is granted

       return granted === PermissionsAndroid.RESULTS.GRANTED;
     } catch (err) {
       console.warn(err);

       alert('Write permission err', err);
     }

     return false;
   } else return true;
 };

const captureImage = async (type) => {

    let options = {

      mediaType: type,

      maxWidth: 300,

      maxHeight: 550,

      quality: 1,

      videoQuality: 'low',

      includeBase64: true

    };
    

    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    console.log(isCameraPermitted);

    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          alert('User cancelled camera picker');

          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');

          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');

          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);

          return;
        }

        console.log('base64 -> ', response.assets[0].base64);

        console.log('uri -> ', response.assets[0].uri);

        console.log('width -> ', response.assets[0].width);

        console.log('height -> ', response.assets[0].height);

        console.log('fileSize -> ', response.assets[0].fileSize);

        console.log('type -> ', response.assets[0].type);

        console.log('fileName -> ', response.assets[0].fileName);
      });
    } else {
      Alert.alert(
        'Permission camera phone',
        'allow camera permission in settings',
        [
          {
            text: 'Huỷ',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => openSettings()},
        ],
      );
    }
  };

 



