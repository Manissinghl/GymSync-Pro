import { Text, Card, Chip, Divider, List } from 'react-native-paper';
import { View, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import utils from '../helper/utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Summary({ navigate, route }) {
  const [data, setData] = useState({});
  useEffect(() => {
    AsyncStorage.getItem(new Date(route.params.date).toDateString()).then(
      (r) => {
        console.log(r);
        setData(JSON.parse(r||'{}'));
      }
    );
  }, []);
  return (
    <Card>
      <Card.Title
        title={<Text style={{fontSize:20,fontWeight:'bold'}}>{`${data?.current_program||"No Records!!!"}`}</Text>}
        subtitle={`${new Date(route.params.date).toDateString()} | ${data?.update_time||''}`}
      />
<ScrollView contentContainerStyle={{ alignItems: 'center' }}
          >
      <Card.Content>
        {Object.keys(data?.data || {}).map((n, i) => (
          <List.Item title={<Text style={{fontSize:15,fontWeight:'bold'}}>{n}</Text>} style={{
            justifyContent:'center', width:'100%',
                    margin: 5,
                    backgroundColor: `${'wheat'}`,
                    borderRadius: 10,
                  }}
          description={()=> <View style={{ flexDirection: 'row' }}>
              {Object.keys(data.data[n]).map((r, i) => {
                return (
                  <View
                    style={{
                      margin: 2,                    
                      alignContent: 'space-around',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      flexWrap:'wrap',
                      flex:1
                    }}>
                    <Text
                      style={{
                        fontSize:12,
                        alignSelf: 'center',
                        color: 'blue',
                        fontWeight: 'bold',
                      }}>
                      Set {r}
                    </Text>
                    <View style={{ flexDirection: 'row',flexWrap:'wrap' ,flex:1}}>
                      {
                        <View
                          style={{
                            alignSelf: 'center',
                            flexDirection: 'row',                            
                            borderRightColor:'red',
                            borderRightWidth:1,
                            padding:2,flexWrap:'wrap'
                          }}>
                          <Text
                            compact={true}
                            style={{
                              fontSize:11,
                              color: utils.textToHex(Math.random()*100),
                              alignSelf: 'center',
                              margin:2
                            }}>
                            {data.data[n][r]['weight']||0} KG |
                          </Text>
                          <Text compact={true} style={{ alignSelf: 'center', fontSize:11, }}>
                            Rep {data.data[n][r]['reps']||0} |
                          </Text>
                          <Text compact={true} style={{ alignSelf: 'center', fontSize:11, }}>
                            {data.data[n][r]['duration']||0} sec
                          </Text>
                        </View>
                      }
                    </View>
                  </View>
                );
              })}
            </View> }/>
        ))}
      </Card.Content>
      </ScrollView>
    </Card>
  );
}
