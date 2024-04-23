import { View, Text, Dimensions, ScrollView, Alert, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Constants } from './helper/constants';
import utils from './helper/utility';
import DateTimePicker from 'react-native-ui-datepicker';
import {
  LayoutAnimation,
  List,
  Divider,
  TouchableRipple,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
const screenWidth = Dimensions.get('window').width;
import {
  PaperProvider,
  Portal,
  Modal,
  Chip,
  Button,
  Avatar,
  Card,
} from 'react-native-paper';
export default function Dashboard({ navigation, route }) {
  const [BMI, setBMI] = useState('OBESE');
  const [profile, setProfile] = useState({});
  const [visible, setVisible] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(63, 143, 244, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    labelColor: (opacity = 1) => `rgba(000, 000, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#fff',
    },
  };

  useEffect(() => {
    navigation.setParams({
      onPress: () => {
        navigation.setParams({ menuVisible: true });
      },
    });
    navigation.setParams({
      onPressPresets: () => {
        setVisible(true);
        navigation.setParams({ menuVisible: false });
      },
    });
    AsyncStorage.getItem('personal_info').then((data) => {
      const n = JSON.parse(data);
      setProfile(n);
      const heightInCM =
        parseFloat(n.height_feet) * 30.48 + parseFloat(n.height_inch) * 2.54;
      const myBMI = utils.calculateBMI(parseFloat(n.weight), heightInCM);
      setBMI(myBMI);
      if (!n.current_program) setVisible(true);

      // setRegister(JSON.parse(n || '{}'));
    });
  }, []);
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
        }}>
        <View style={{ margin: 1, flex: 1, backgroundColor: 'transparent' }}>
          <Card>
            <Card.Title
              title={utils.greetByTime()}
              subtitle={profile.full_name}
              right={() => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'space-around',
                  }}>
                  <Chip
                    mode="outlined"
                    style={{ alignSelf: 'baseline', margin: 2 }}>
                    BMI:{BMI}
                  </Chip>
                  <Chip
                    mode="outlined"
                    style={{ alignSelf: 'baseline', margin: 2 }}>
                    Wt:{profile.weight} KG
                  </Chip>
                </View>
              )}
            />
            <Card.Content>
              <LineChart
                bezier
                data={{
                  labels: ['Weight', 'Target'],
                  datasets: [
                    {
                      data: [
                        parseInt(profile?.weight || 0),
                        parseInt(profile?.target_weight || 0),
                      ],
                      color: (opacity = 0.9) =>
                        `rgba(100, 100, 100, ${opacity})`, // optional
                    },
                  ],
                  legend: ['Weight Goals'], // optional
                }}
                backgroundColor="red"
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
              />
            </Card.Content>

            <Card.Actions style={{ alignSelf: 'center' }}>
              <Chip
                style={{ fontSize: 8, backgroundColor: 'yellow', margin: 1 }}
                onPress={() => {
                  setShowHistory(true);
                }}>
                History
              </Chip>
              <Chip
                style={{ fontSize: 8, backgroundColor: 'white', margin: 1 }}
                onPress={() => {
                  setVisible(true);
                }}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <Text style={{ fontSize: 8 }}>Your Program</Text>
                  <Text style={{ fontWeight: 'bold' }}>
                    {profile.current_program}
                  </Text>
                </View>
              </Chip>
              <Chip
                style={{ fontSize: 8, backgroundColor: 'cyan', margin: 1 }}
                onPress={() => {
                  navigation.navigate('Summary', {
                    date: new Date().toDateString(),
                  });
                }}>
                Summary
              </Chip>
            </Card.Actions>
          </Card>
        </View>
        <ScrollView
         contentContainerStyle={{alignItems: 'center' }}
         style={{ 
           flex: 2,
           backgroundColor: '#f2f0d8',
         }}>
          {Object.keys(Constants.programs[profile.current_program] || []).map(
            (n, i) => {
              const isToday = new Date().getDay() == i;
              return (
                <TouchableRipple
                  onPress={async() => {
                    const today = new Date().toDateString();
                 let todayData=await AsyncStorage.getItem(today);
                  todayData=JSON.parse(todayData||'{}');
                    navigation.navigate('Excercise', {
                      name: n,
                      todayData:todayData?.data||{},
                      data: Constants.programs[profile.current_program][n],
                      onChange: async (x) => {
                        utils.removeEmpty(x); 
                        
                        AsyncStorage.getItem(today).then(async (r) => {
                          let prev = JSON.parse(r || '{}');
                          utils.removeEmpty(prev);
                          await AsyncStorage.setItem(
                            today,
                            JSON.stringify({
                              current_program: profile.current_program,
                              excercise_name: n,
                              update_time: new Date().toTimeString(),
                              data:{ ...(prev?.data || {}), ...x },
                            })
                          );
                        });
                      },
                    });
                  }}
                  rippleColor="rgba(0, 0, 0, .32)">
                  <List.Item
                    style={{
                      width: '100%', 
                      margin: 10,
                      backgroundColor: `${isToday ? 'wheat' : 'gray'}`,
                      borderRadius: 10,
                    }}
                    title={n}
                    description={`Day ${i} `}
                    left={(props) => (
                      <Image
                        source={('android:/icon.png')}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          borderWidth: 1,
                        }}
                      />
                    )}
                    right={(props) => (
                      <List.Icon {...props} icon="chevron-right" />
                    )}
                  />
                </TouchableRipple>
              );
            }
          )}
        </ScrollView>
        <Modal
          visible={visible}
          contentContainerStyle={{
            width: '60%',
            height: '40%',
            alignSelf: 'center',
          }}
          onDismiss={() => {
            setVisible(!profile.current_program);
          }}>
          <Card style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Card.Title title="Choose Program" />
            <Card.Content>
              {['HIIT', 'Loose Weight', 'Get Fit', 'Cardio'].map((n) => (
                <Chip
                  selected={n === profile.current_program}
                  style={{ backgroundColor: utils.textToHex(n), margin: 2 }}
                  onPress={async (p) => {
                    const newProfile = {
                      ...profile,
                      ...{ current_program: n },
                    };
                    await AsyncStorage.setItem(
                      'personal_info',
                      JSON.stringify(newProfile)
                    );
                    setProfile(newProfile);
                    setVisible(false);
                  }}>
                  {n}
                </Chip>
              ))}
            </Card.Content>
          </Card>
        </Modal>
        <Modal
          visible={showHistory}
          contentContainerStyle={{
            width: '60%',
            height: '40%',
            alignSelf: 'center',
          }}
          onDismiss={() => {
            setShowHistory(false);
          }}>
          <Card style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Card.Title title="Choose Date" />
            <Card.Content>
              <DateTimePicker
                mode="single"
                onChange={async (params) => {
                  navigation.navigate('Summary', { date: params.date });
                }}
              />
            </Card.Content>
          </Card>
        </Modal>
      </View>
    </>
  );
}
