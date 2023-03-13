import { NavigationContainer } from '@react-navigation/native';
import tw from 'twrnc';
import { Provider as PaperProvider } from 'react-native-paper';
import AuthStack from './src/Screens/authStack';
import 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <NavigationContainer style={tw`bg-white`}>
      <PaperProvider>
        <ToastProvider>
          <AuthStack />
        </ToastProvider>
      </PaperProvider>
      <StatusBar
        animated={true}
        translucent
        backgroundColor='transparent'
        barStyle='dark-content'
      />
    </NavigationContainer>
  );
}
