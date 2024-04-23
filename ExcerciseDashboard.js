import { View, Text, Dimensions, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { ImgConstants } from './helper/image-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CardView from './components/exercise-card';
const screenWidth = Dimensions.get('window').width;

export default function Excercise({ navigation, route }) {
  const [data, setData] = useState({});
  useEffect(() => {
    route.params.onChange?.(data);
  }, [data]);
  return (
    <ScrollView
    contentContainerStyle={{ alignItems: 'center' }}
    style={{
      width: '100%',
      flex: 2,
      backgroundColor: '#f2f0d8',
    }}>
      {(route.params?.data || []).map((k) => { 
        return (
          <CardView
            todayData={route.params.todayData[k.title]}
            set={k.set}
            imageSource={ImgConstants.logo}
            title={k.title}
            onChange={(r) => {
              setData((prev) => {
                let newData = { ...prev };
                newData[k.title] = r;
                return newData;
              });
            }}
          />
        );
      })}
    </ScrollView>
  );
}
