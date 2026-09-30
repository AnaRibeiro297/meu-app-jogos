import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useTema } from '../contexts/ThemeContext';
import { buscarJogos } from '../services/api';
import CardJogo from '../components/CardJogo';

export default function ListaGame({ navigation }) {
  const { cores } = useTema();

  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await buscarJogos();
      setJogos(dados);
    } catch (err) {
      setErro(err.message || 'Não foi possível carregar a lista de jogos.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  if (carregando) {
    return (
      <View style={[styles.centrado, { backgroundColor: cores.background }]}>
        <ActivityIndicator size="large" color={cores.primary} />
        <Text style={[styles.mensagem, { color: cores.textSecondary }]}>Carregando jogos...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={[styles.centrado, { backgroundColor: cores.background }]}>
        <Text style={[styles.mensagem, { color: cores.error }]}>Erro: {erro}</Text>
        <TouchableOpacity
          style={[styles.botaoTentar, { backgroundColor: cores.primary }]}
          onPress={carregar}
        >
          <Text style={{ color: cores.primaryText, fontWeight: '600' }}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: cores.background }]}>
      <FlatList
        data={jogos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CardJogo
            jogo={item}
            cores={cores}
            onPress={(id) => navigation.navigate('DetalheJogo', { jogoId: id })}
          />
        )}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={[styles.mensagem, { color: cores.textSecondary, marginTop: 48 }]}>
            Nenhum jogo encontrado no catálogo.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centrado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 24,
  },
  lista: {
    padding: 16,
    gap: 12,
  },
  mensagem: {
    fontSize: 15,
    textAlign: 'center',
  },
  botaoTentar: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
});