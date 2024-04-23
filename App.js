import { Text, SafeAreaView, StyleSheet } from 'react-native';

// You can import supported modules from npm
import { Card, Button, IconButton, Menu,PaperProvider } from 'react-native-paper';
import Summary from './components/summary';
// or any files within the Snack
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './Dashboard';
import Excercise from './ExcerciseDashboard';
import { Appbar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
       
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={({ route }) => ({
              headerShown: false,
              title: route.params?.name || 'Login',
            })}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={({ route }) => ({
              title: route.params?.name || 'Register',
            })}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={({ navigation,route }) => ({
              title: route.params?.name || 'Dashboard',
              headerRight: () => (
                <Menu
                  visible={route.params?.menuVisible||false} 
                  anchor={<IconButton icon="dots-vertical" onPress={route.params?.onPress} />}>
                  <Menu.Item onPress={route.params?.onPressPresets} title="Programs" />
                  <Menu.Item onPress={()=>{
                    navigation.setParams({menuVisible:false})
                    navigation.push('Register');}} title="Change Profile" />
                </Menu>
              ),
            })}
          />
          <Stack.Screen
            name="Excercise"
            component={Excercise}
            options={({ route }) => ({
              title: route.params?.name || 'Excercise',
            })}
          />

          <Stack.Screen
            name="Summary"
            component={Summary}
            options={({ route }) => ({
              title: route.params?.name || 'Summary',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 5,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
