import React, { useState, setState, useEffect } from 'react';
import { ImgConstants } from '../helper/image-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SegmentedButtons } from 'react-native-paper'; 

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

export default function Register({ navigation }) {
  const [register, setRegister] = useState({});
  useEffect(() => {
    AsyncStorage.getItem('personal_info').then((n) => { 
      setRegister(JSON.parse(n || '{}'));
    });
  }, []);
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
            value={register.full_name}
            style={{ flex: 1, height: 40, color: 'black' }}
            placeholder={'Full Name'}
            placeholderTextColor={'#808080'}
            onChangeText={(text) =>
              setRegister((xx) => ({ ...xx, ...{ full_name: text } }))
            }
            underlineColorAndroid="transparent"
            keyboardType={'default'}
            returnKeyType="done"
          />
        </View>
        <View style={styles.input}>
          <TextInput
            value={register.email}
            style={{ flex: 1, height: 40, color: 'black' }}
            placeholder={'Email'}
            placeholderTextColor={'#808080'}
            onChangeText={(text) =>
              setRegister((xx) => ({ ...xx, ...{ email: text } }))
            }
            underlineColorAndroid="transparent"
            keyboardType={'default'}
            returnKeyType="done"
          />
        </View>
        <View style={styles.input}>
          <TextInput
            value={register.password}
            style={{ flex: 1, height: 40, color: 'black' }}
            placeholder={'Password'}
            placeholderTextColor={'#808080'}
            onChangeText={(text) =>
              setRegister((xx) => ({ ...xx, ...{ password: text } }))
            }
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            returnKeyType="done"
          />
        </View>

        <View style={styles.input}>
          <TextInput
            value={register.age}
            onChanged={(text) => {
              this.setState({
                mobile: text.replace(/[^0-9]/g, ''),
              });
            }}
            style={{ flex: 1, height: 40, color: 'black' }}
            placeholder={'Age'}
            onChangeText={(text) =>
              setRegister((xx) => ({ ...xx, ...{ age: text } }))
            }
            placeholderTextColor={'#808080'}
            underlineColorAndroid="transparent"
            maxLength={2}
            keyboardType={'number-pad'}
          />
        </View> 
          <SegmentedButtons
          style={{margin:5}}          
            pointerEvents="none"
            value={register.sex||'Male'}
            onValueChange={(val) => {
              setRegister((xx) => ({ ...xx, ...{ sex: val } }));
            }}
            buttons={[
              {
                label: 'Male',
                value: 'Male',
              },
              {
                label: 'Female',
                value: 'Female',
              },
              {
                label: 'Others',
                value: 'Others',
              },
            ]}
          /> 
        <View style={styles.input}>
          <TextInput
            style={{ flex: 1, height: 40, color: 'black' }}
            placeholder={'Weight in kg'}
            onChangeText={(text) =>
              setRegister((xx) => ({ ...xx, ...{ weight: text } }))
            }
            value={register.weight} 
            placeholderTextColor={'#808080'}
            underlineColorAndroid="transparent"
            keyboardType={'number-pad'}
            returnKeyType="done"
          />
        </View>
        <View style={styles.input}>
          <TextInput
            value={register.target_weight}
            style={{ flex: 1, height: 40, color: 'black' }}
            placeholder={'Weight Target in kg'} 
            onChangeText={(text) =>
              setRegister((xx) => ({ ...xx, ...{ target_weight: text } }))
            }
            placeholderTextColor={'#808080'}
            underlineColorAndroid="transparent"
            keyboardType={'number-pad'}
            returnKeyType="done"
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={{ alignSelf: 'center', fontWeight: '500' }}>Height</Text>
          <View style={[styles.input, { width: 100 }]}>
            <TextInput
              style={{ flex: 1, height: 40, color: 'black' }}
              placeholder={'Feet'}
              onChangeText={(text) =>
                setRegister((xx) => ({ ...xx, ...{ height_feet: text } }))
              }
              value={register.height_feet}
               
              placeholderTextColor={'#808080'}
              underlineColorAndroid="transparent"
              keyboardType={'number-pad'}
              returnKeyType="done"
            />
          </View>
          <View style={[styles.input, { width: 100 }]}>
            <TextInput
              value={register.height_inch}
              onChangeText={(text) =>
                setRegister((xx) => ({ ...xx, ...{ height_inch: text } }))
              }
              style={{ flex: 1, height: 40, color: 'black' }}
              placeholder={'Inch'}
            
              placeholderTextColor={'#808080'}
              underlineColorAndroid="transparent"
              keyboardType={'number-pad'}
              returnKeyType="done"
            />
          </View>
        </View>
        <View style={styles.input}>
          <TextInput
            value={register.bpm}
            style={{ flex: 1, height: 40, color: 'black' }}
            placeholder={'Blood Pressure'}
            onChangeText={(text) =>
              setRegister((xx) => ({ ...xx, ...{ bpm: text } }))
            }
            placeholderTextColor={'#808080'}
            underlineColorAndroid="transparent"
          />
        </View>

        <Pressable
          onPress={async () => {
            const value = JSON.stringify(register);
            try {
              await AsyncStorage.setItem('personal_info', value); 
              Alert.alert('Profile Saved', 'Successfully!');
            } catch (ex) {
              Alert.alert('notok', JSON.stringify(ex));
            }
            navigation.goBack()
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
            Update Yourself
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
