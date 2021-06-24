import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './App/Utils/Navigation'
import { Provider } from 'react-redux';
import reduxStore from './App/Redux/reduxConfig'
import Orientation from 'react-native-orientation-locker';
import SplashScreen from 'react-native-splash-screen'

const store = reduxStore()

const App = () => {

  useEffect(()=>{
    SplashScreen.hide();
    const orientation = Orientation.getInitialOrientation();
    if(orientation == "LANDSCAPE-LEFT" || orientation == "LANDSCAPE-RIGHT"){
      Orientation.lockToPortrait();
    }
    else{
      Orientation.lockToPortrait();
    }
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;