import React from 'react'
import { Root } from 'native-base'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { appPersistor, appStore } from './src/components/store';
import { PersistGate } from 'redux-persist/integration/react'

import {myUserReducer, userActiveReducer} from './src/reducers/user'

import SplashScreen from './src/components/splashScreen/SplashScreen'
import Login from './src/components/user/Login'
import Register from './src/components/user/Register'
import HomeScreen from './src/components/Home'
import IntroScreen from "./src/components/IntroScreen";
import Profile from "./src/components/user/Profile";
import Reservation from "./src/components/reservation/Reservation";
import CheckScoliosis from "./src/components/diagnose/CheckScoliosis";
import SplashScreenLogout from "./src/components/splashScreen/SplashScreenLogout";
import ProfileUpdate from "./src/components/user/ProfileUpdate";
import UploadRontgen from "./src/components/user/UploadRontgen";
import CaptureRontgen from "./src/components/user/CaptureRontgen";
import NearHospital from "./src/components/hospital/NearHospital";
import ScoliosisInformation from "./src/components/information/ScoliosisInformation";
import BarcodeScanner from "./src/components/reservation/BarcodeScanner";
import MenuReservation from "./src/components/reservation/MenuReservation";
import AboutUs from "./src/components/about/AboutUs";
import ChatRoom from "./src/components/message/ChatRoom";
import SplashScreenLogin from "./src/components/splashScreen/SplashScreenLogin";
import ListDisease from "./src/components/diagnose/ListDisease";
import Diagnose from "./src/components/diagnose/Diagnose";
import HelpInformation from "./src/components/information/HelpInformation";
import MyHistory from "./src/components/user/MyHistory";

const MainNavigator = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      header: null,
    }
  },

  IntroScreen: {
    screen: IntroScreen,
    navigationOptions: {
      header: null
    }
  },

  SplashScreenLogin: {
    screen: SplashScreenLogin,
    navigationOptions: {
      header: null,
    }
  },

  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    }
  },

  Register: {
    screen: Register,
    navigationOptions: {
      header: null,
    }
  },

  MyHistory: {
    screen: MyHistory,
    navigationOptions: {
      header: null,
    }
  },

  NearHospital: {
    screen: NearHospital,
    navigationOptions: {
      header: null,
    }
  },

  HelpInformation: {
    screen: HelpInformation,
    navigationOptions: {
      header: null,
    }
  },

  ListDisease: {
    screen: ListDisease,
    navigationOptions: {
      header: null,
    }
  },

  Diagnose: {
    screen: Diagnose,
    navigationOptions: {
      header: null,
    }
  },

  ScoliosisInformation: {
    screen: ScoliosisInformation,
    navigationOptions: {
      header: null,
    }
  },

  AboutUs: {
    screen: AboutUs,
    navigationOptions: {
      header: null,
    }
  },

  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null,
    }
  },

  ProfileUpdate: {
    screen: ProfileUpdate,
    navigationOptions: {
      header: null,
    }
  },

  Main: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },

  CheckScoliosis: {
    screen: CheckScoliosis,
    navigationOptions: {
      header: null
    }
  },

  Reservation: {
    screen: Reservation,
    navigationOptions: {
      header: null
    }
  },

  MenuReservation: {
    screen: MenuReservation,
    navigationOptions: {
      header: null
    }
  },

  BarcodeScanner: {
    screen: BarcodeScanner,
    navigationOptions: {
      header: null
    }
  },

  ChatRoom: {
    screen: ChatRoom,
    navigationOptions: {
      header: null
    }
  },

  UploadRontgen: {
    screen: UploadRontgen,
    navigationOptions: {
      header: null
    }
  },

  CaptureRontgen: {
    screen: CaptureRontgen,
    navigationOptions: {
      header: null
    }
  },

  SplashScreenLogout: {
    screen: SplashScreenLogout,
    navigationOptions: {
      header: null
    }
  }
},

  {
    initialRouteName: 'SplashScreen',
  }
);


const AppNavigator = createAppContainer(MainNavigator);

export default () => (
  <Provider store={appStore}>
    <PersistGate loading={null} persistor={appPersistor}>
      <Root>
        <AppNavigator />
      </Root>
    </PersistGate>
  </Provider>


)