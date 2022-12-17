import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { useAppDispatch } from './src/hooks/useAppDispatch';
import { authCheck } from './src/features/auth/auth-slice';
import { store } from './src/app/store';
import { ReactNavigationDarkTheme, ReactNavigationDefaultTheme } from './src/themes/ReactNavigationThemes';
import { ThemeProvider } from './src/themes/ThemeProvider';
import RootNavigator from './src/navigation/RootNavigator';


export default function App() {
  
  const scheme = useColorScheme();
  
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer theme={scheme === 'dark' ? ReactNavigationDarkTheme : ReactNavigationDefaultTheme}>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider> 
  );

}