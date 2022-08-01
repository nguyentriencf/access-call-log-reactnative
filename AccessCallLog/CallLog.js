export default CallLog = async (phoneNumber) => {
 
  try {
    const filter = {
      phoneNumbers: phoneNumber
    };
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      {
        title: 'Call Log Example',
        message: 'Access your call logs',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log(CallLogs);
      CallLogs.load(5, filter).then(c => console.log(c));
    } else {
      console.log('Call Log permission denied');
    }
  } catch (e) {
    console.log(e);
  }
};
