import React, { useState, useEffect } from 'react';
import InputSpinner from "react-native-input-spinner";

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { SegmentedButtons } from 'react-native-paper';

export default CardView = ({
   
  imageSource,
  title,
  todayData,
  description,
  onPress,
  onChange,
  set = 3,
}) => {
  const [index, setIndex] = useState('0');
  const [data, setData] = useState(todayData||{});
  useEffect(() => {
   onChange?.(data) 
  }, [data]);
  useEffect(() => {
    console.log(todayData,'_+++++')
  }, []);
  return (
    <>
      <SegmentedButtons pointerEvents="none"
        style={{ margin: 10 }}
        value={index}
        onValueChange={(val) => {
          setIndex(val);
        }}
        buttons={[...Array(set)].map((n, i) => ({
          label: `Set:${i + 1}`,
          value: i.toString(),
        }))}
      />
      <SetCardContent
        imageSource={imageSource}
        title={title}
        duration={data[index]?.duration || 0}
        weight={data[index]?.weight || 0}
        reps={data[index]?.reps || 0}
        onChange={(type, val) => {
          setData((prevData) => {
            // Create a copy of the previous data
            const newData = { ...prevData };
            // Update or initialize the object for the current index
            newData[index] = { ...(newData[index] || {}) };
            // Update the value for the specified type
            newData[index][type] = val;

            return newData;
          });
        }}
      />
      </>
     
  );
};
const SetCardContent = ({ imageSource, title,duration, weight, reps, onChange }) => {
  useEffect(() => {}, [weight, reps]);
  return (
    <>
      <TouchableOpacity style={styles.card}>
        <Image source={{ uri: imageSource }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{title}</Text>
          <View style={{ flexDirection: 'column' }}>
            <View
              style={[
                styles.cardDescription,
                { flexDirection: 'column', alignContent: 'space-between' },
              ]}>
              <NumericUp
                text="Weight"
                unit="(KG)"
                step={5}
                value={weight}
                onChange={(val) => {
                  onChange('weight', val);
                }}
              />
              <NumericUp
                text="Reps"
                unit="(Steps)"
                value={reps}
                onChange={(val) => {
                  onChange('reps', val);
                }}
              />
              <NumericUp
                text="Duration"
                unit="(Seconds)"
                value={duration}
                onChange={(val) => {
                  onChange('duration', val);
                }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const NumericUp = ({ text, value, unit = '', onChange,step=1 }) => {
  const [iVal, setIVal] = useState(value);
  useEffect(() => {
    //Alert.alert("test",value)
  }, [iVal]);
  return (
    <View
      style={[
        styles.cardDescription,
        { flexDirection: 'column', alignContent: 'flex-start', margin: 5 },
      ]}>
      <Text
        style={{
          fontWeight: 'bold',
          marginBottom: 5,
        }}>{`${text} ${unit} ${value}`}</Text>
      <InputSpinner
        max={150}
        min={0}
        step={step}
        skin="paper"
        colorMax={'#f04048'}
        colorMin={'#40c5f4'}
        value={value}
        onChange={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
});
