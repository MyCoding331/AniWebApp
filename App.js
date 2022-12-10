import {
  SafeAreaView,
  View,
  StatusBar,
  AppRegistry,
  Dimensions,
} from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import RouteIn from "./Screens/RouteIn";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Context from "./Helper/Context";
import store from "./Helper/redux/store"
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import InternetCheck from "./Screens/Pages/InternetCheck";
import ActivityLoader from "./Components/ActivityLoader";
import NetInfo from "@react-native-community/netinfo";
export default function App() {
 


  let ScreenHeight = Dimensions.get("window").height;
  let persistor = persistStore(store)
  const [isConnected, SetIsConnected] = useState(true)
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Connection type", state.type);
      console.log("Is InternetReachable?", state.isInternetReachable);
      SetIsConnected(state.isInternetReachable);
     
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>

      <SafeAreaView
        style={{ backgroundColor: "#1c1c1e", height: ScreenHeight + 50 }}
      >
        <Provider store={store}>
          <PersistGate persistor={persistor}>

            <Context>
              {isConnected == false ? (

                <View style={{ position: "absolute", top: 200, backgroundColor: "#1c1c1e", left: 25, }}>

                  <InternetCheck isConnected={isConnected} SetIsConnected={SetIsConnected} />
                </View>

              ) : (

                <RouteIn />
              )}

            </Context>
          </PersistGate>

        </Provider>



        {/* <Navi/> */}
      </SafeAreaView>

    </>
  );
}
