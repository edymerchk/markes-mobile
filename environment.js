
import Constants from 'expo-constants';
import { Platform } from "react-native";

const ENV = {
 dev: {
   apiUrl: "http://192.168.1.70:3000/api/markers"
 },
 prod: {
   apiUrl: "https://markers-backend-production.herokuapp.com/api/markers",
 }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
 // What is __DEV__ ?
 // This variable is set to true when react-native is running in Dev mode.
 // __DEV__ is true when run locally, but false when published.
 if (__DEV__) {
   return ENV.dev;
 } else if (env === 'prod') {
   return ENV.prod;
 }
};

export default getEnvVars;
