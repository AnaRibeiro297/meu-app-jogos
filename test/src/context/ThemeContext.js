import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@game_catalog:tema';

const temaClaro = {
  background: '#F4F4F6',
  card: '#FFFFFF',
  text: '#121214',
  textSecondary: '#666673',
  primary: '#8257E5', // Roxo Gamer
  primaryText: '#FFFFFF',
  border: '#E1E1E6',
  error: '#E53E3E',
  success: '#a6e1c1',
  tabBar: '#FFFFFF',
  header: '#8257E5',
  headerText: '#FFFFFF',
};

const temaEscuro = {
  background: '#121214',
  card: '#202024',
  text: '#E1E1E6',
  textSecondary: '#A8A8B3',
  primary: '#996DFF', // Roxo Neon Gamer
  primaryText: '#FFFFFF',
  border: '#323238',
  error: '#dc0303',
  success: '#04D361',
  tabBar: '#121214',
  header: '#202024',
  headerText: '#E1E1E6',
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [modoEscuro, setModoEscuro] = useState(true); // Padrão escuro para catálogo gamer

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((valor) => {
      if (valor !== null) setModoEscuro(valor === 'escuro');
    });
  }, []);

  function alternarTema() {
    const novoModo = !modoEscuro;
    setModoEscuro(novoModo);
    AsyncStorage.setItem(STORAGE_KEY, novoModo ? 'escuro' : 'claro');
  }

  const cores = modoEscuro ? temaEscuro : temaClaro;

  return (
    <ThemeContext.Provider value={{ modoEscuro, alternarTema, cores }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTema() {
  return useContext(ThemeContext);
}