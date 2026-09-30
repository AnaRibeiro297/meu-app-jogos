import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTema } from '../contexts/ThemeContext';

export default function Configuracoes() {
  const { modoEscuro, alternarTema, cores } = useTema();

  async function handleLimparDados() {
    Alert.alert(
      'Limpar Cache local',
      'Deseja redefinir as preferências salvas no aplicativo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            Alert.alert('Sucesso', 'Configurações locais redefinidas.');
          },
        },
      ]
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: cores.background }]}>
      <Text style={[styles.titulo, { color: cores.text }]}>Configurações</Text>

    
      <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
        <Text style={[styles.secaoTitulo, { color: cores.primary }]}>Aparência</Text>
        
        <View style={styles.opcao}>
          <View style={styles.opcaoInfo}>
            <Text style={[styles.opcaoTexto, { color: cores.text }]}>Modo Escuro</Text>
            <Text style={[styles.opcaoSubtexto, { color: cores.textSecondary }]}>
              {modoEscuro ? 'Ativado (Aparência Gamer)' : 'Desativado (Tema Claro)'}
            </Text>
          </View>
          <Switch
            value={modoEscuro}
            onValueChange={alternarTema}
            trackColor={{ false: '#767577', true: cores.primary }}
            thumbColor={modoEscuro ? '#FFFFFF' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Seção de Dados e Armazenamento */}
      <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
        <Text style={[styles.secaoTitulo, { color: cores.primary }]}>Dados</Text>

        <TouchableOpacity 
          style={styles.botaoAcao} 
          onPress={handleLimparDados}
          activeOpacity={0.7}
        >
          <Text style={[styles.opcaoTexto, { color: cores.error }]}>Redefinir Preferências</Text>
          <Text style={[styles.opcaoSubtexto, { color: cores.textSecondary }]}>
            Limpa o histórico de configurações locais salvas no dispositivo.
          </Text>
        </TouchableOpacity>
      </View>

     
      <View style={styles.rodape}>
        <Text style={[styles.versao, { color: cores.textSecondary }]}>Game Catalog App v1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  secaoTitulo: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  opcao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  opcaoInfo: {
    flex: 1,
    paddingRight: 10,
  },
  opcaoTexto: {
    fontSize: 16,
    fontWeight: '600',
  },
  opcaoSubtexto: {
    fontSize: 12,
    marginTop: 2,
  },
  botaoAcao: {
    paddingVertical: 4,
  },
  rodape: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: 16,
  },
  versao: {
    fontSize: 12,
  },
});