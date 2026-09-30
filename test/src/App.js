import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { ThemeProvider, useTema } from './src/contexts/ThemeContext';
import ListaGame from './src/screens/ListaGame';
import DetalheJogo from './src/screens/DetalheJogo';
import Favoritos from './src/screens/GameFavoritos';
import ConfiguracoesScreen from './src/screens/ConfiguracoesScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CatalogoStack() {
  const { cores } = useTema();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: cores.header },
        headerTintColor: cores.headerText,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen 
        name="ListaGame" 
        component={ListaGame} 
        options={{ title: 'Catálogo de Jogos' }} 
      />
      <Stack.Screen
        name="DetalheJogo"
        component={DetalheJogo}
        options={{ title: 'Detalhes do Jogo' }}
      />
    </Stack.Navigator>
  );
}

function Navegacao() {
  const { cores } = useTema();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: cores.tabBar,
            borderTopColor: cores.border,
          },
          tabBarActiveTintColor: cores.primary,
          tabBarInactiveTintColor: cores.textSecondary,
          headerStyle: { backgroundColor: cores.header },
          headerTintColor: cores.headerText,
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Tab.Screen
          name="Catalogo"
          component={CatalogoStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Catálogo',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🎮</Text>,
          }}
        />
        <Tab.Screen
          name="Favoritos"
          component={Favoritos}
          options={{
            title: 'Meus Favoritos',
            tabBarLabel: 'Favoritos',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>⭐</Text>,
          }}
        />
        <Tab.Screen
          name="Configuracoes"
          component={ConfiguracoesScreen}
          options={{
            title: 'Configurações',
            tabBarLabel: 'Config',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>⚙️</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Navegacao />
    </ThemeProvider>
  );
}