import React, { useState, setState, useEffect } from 'react';
import { ImgConstants } from '../helper/image-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SafeAreaView,
  Alert,
  Pressable,
  TextInput,
  CheckBox,
  Image,
  Text,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import { Snackbar } from 'react-native-paper';

export default function Login({ navigation }) {
  const [profile, setProfile] = useState({});
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    // AsyncStorage.clear().then(r => {
    //   console.log(r)
    // })
  }, [])

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#FFFAFA', justifyContent: 'center' }}>
      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
          height: '90%',
          backgroundColor: '#b19cd9',
          borderRadius: 10,
          overflow: 'hidden',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            marginTop: 20,
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: 'pink',
            alignSelf: 'center',
          }}
          source={{
            uri: ImgConstants.logo,
          }}
        />

        <View style={styles.input}>
          <TextInput
            value={profile.email}
            style={{ flex: 1, height: 40, color: 'black' }}
            placeholder={'Email'}
            placeholderTextColor={'#808080'}
            onChangeText={(text) =>
              setProfile((xx) => ({ ...xx, ...{ email: text } }))
            }
            underlineColorAndroid="transparent"
            keyboardType={'email-address'}
            returnKeyType="done"
          />
        </View>

        <View style={styles.input}>
          <TextInput
            value={profile.password}
            style={{ flex: 1, height: 40, color: 'black' }}
            placeholder={'Password'}
            onChangeText={(text) =>
              setProfile((xx) => ({ ...xx, ...{ password: text } }))
            }
            placeholderTextColor={'#808080'}
            underlineColorAndroid="transparent"
            secureTextEntry={true}
          />
        </View>
        <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
          Sorry, username/password is wrong/empty
        </Snackbar>
        <Pressable
          onPress={async () => {
            try {
              let val = await AsyncStorage.getItem('personal_info');
              val = JSON.parse(val);
              if (
                val.email == profile.email &&
                val.password == profile.password
              ) {
                navigation.navigate('Dashboard');
              } else setVisible(true);
            } catch (ex) {
              Alert.alert('notok', JSON.stringify(ex));
            }
          }}
          style={{
            height: 40,
            padding: 5,
            margin: 10,
            backgroundColor: '#4E261A',
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 17,
              fontWeight: 'bold',
              marginLeft: 5,
              marginRight: 5,
            }}>
            Login
          </Text>
        </Pressable>
        <Text style={{ alignSelf: 'center' }}>OR</Text>
        <Pressable
          onPress={async () => {
            navigation.push('Register');
          }}
          style={{
            height: 40,
            padding: 5,
            margin: 10,
            backgroundColor: '#4E261A',
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 17,
              fontWeight: 'bold',
              marginLeft: 5,
              marginRight: 5,
            }}>
            Register
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowOpacity: 0.25,
    elevation: 0,
    shadowRadius: 1,

    marginTop: 10,

    marginLeft: 10,

    marginRight: 10,

    height: 40,

    paddingLeft: 8,

    paddingRight: 8,

    padding: 2,

    borderRadius: 10,

    backgroundColor: '#FFFFFF',

    textAlign: 'left',

    borderWidth: 1,

    borderColor: '#808080',
    ...Platform.select({
      ios: {
        marginBottom: 10,
      },
    }),
  },
});
