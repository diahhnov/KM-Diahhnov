import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  const [totalMess, setTotalMess] = useState(0);
  // const setCrash = async () =>{
  //       await crashlytics()
  //         .setCrashlyticsCollectionEnabled(!enabled)
  // }

  useEffect(() => {
    crashlytics().log('App amount');
    // analytics().logScreenView('Login');
    // setCrash();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setTotalMess(totalMess + 1);
    });
    return unsubscribe;
  }, [totalMess]);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          crashlytics().log('test crash');
          crashlytics().crash();
        }}>
        <Text>click here crashlytics</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () =>
          await analytics().logSelectContent({
            content_type: 'clothing',
            item_id: 'abcd',
          })
        }>
        <Text>click here analytics</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () =>
          await analytics().logEvent('register_account', {
            content_type: 'clothing',
            item_id: 'abcd',
          })
        }>
        <Text>click here analytics</Text>
      </TouchableOpacity>
    </View>
  );
}
