import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Home } from "./src/screens/Home";
import { NewGame } from "./src/screens/NewGame";
import { ActiveGame } from "./src/screens/ActiveGame";
import { Game } from "./src/model/game";
import { AppProviders } from "./src/contexts/AppProviders";

export type RootStackParamList = {
  Home: undefined;
  NewGame: undefined;
  ActiveGame: { game: Game };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewGame"
        component={NewGame}
        options={{ title: "Create New Game" }}
      />
      <Stack.Screen
        name="ActiveGame"
        component={ActiveGame}
        options={({ route }) => ({ title: route.params.game.name })}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AppProviders>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={["top"]}>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </AppProviders>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
