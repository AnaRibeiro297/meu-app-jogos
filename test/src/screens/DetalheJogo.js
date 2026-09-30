import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useTema } from '../contexts/ThemeContext';
import { buscarJogoPorId, adicionarFavorito } from '../services/api';

export default function DetalheJogo({ route }) {
  const { jogoId } = route.params;
  const { cores } = useTema();

  const [jogo, setJogo] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [adicionando, setAdicionando] = useState(false);
  const [jaFavoritado, setJaFavoritado] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await buscarJogoPorId(jogoId);
      setJogo(dados);
    } catch (err) {
      setErro(err.message || 'Não foi possível carregar os detalhes do jogo.');
    } finally {
      setCarregando(false);
    }
  }, [jogoId]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function handleAdicionarFavorito() {
    if (!jogo) return;

    try {
      setAdicionando(true);
      setFeedback(null);

      await adicionarFavorito(jogo.id, '');

      setJaFavoritado(true);
      setFeedback({ tipo: 'sucesso', texto: 'Jogo adicionado aos favoritos!' });
    } catch (err) {
      if (err.response?.status === 409) {
        setJaFavoritado(true);
        setFeedback({ tipo: 'erro', texto: 'Este jogo já está nos favoritos.' });
      } else {
        setFeedback({ tipo: 'erro', texto: 'Erro ao favoritar jogo.' });
      }
    } finally {
      setAdicionando(false);

      setTimeout(() => {
        setFeedback(null);
      }, 3000);
    }
  }

  if (carregando) {
    return (
      <View style={[styles.centrado, { backgroundColor: cores.background }]}>
        <ActivityIndicator size="large" color={cores.primary} />
        <Text style={[styles.texto, { color: cores.textSecondary }]}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={[styles.centrado, { backgroundColor: cores.background }]}>
        <Text style={[styles.texto, { color: cores.error }]}>Erro: {erro}</Text>
        <TouchableOpacity style={[styles.botao, { backgroundColor: cores.primary }]} onPress={carregar}>
          <Text style={{ color: cores.primaryText, fontWeight: '600' }}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!jogo) {
    return (
      <View style={[styles.centrado, { backgroundColor: cores.background }]}>
        <Text style={[styles.texto, { color: cores.textSecondary, textAlign: 'center' }]}>
          Jogo não encontrado.
        </Text>
      </View>
    );
  }

  const corFeedback = feedback?.tipo === 'sucesso' ? cores.success : cores.error;

  return (
    <ScrollView style={{ backgroundColor: cores.background }} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {jogo.capa || jogo.imagem ? (
        <Image source={{ uri: jogo.capa || jogo.imagem }} style={styles.capa} resizeMode="cover" />
      ) : null}

      <View style={styles.conteudo}>
        <Text style={[styles.titulo, { color: cores.text }]}>{jogo.titulo || jogo.nome}</Text>
        <Text style={[styles.plataforma, { color: cores.textSecondary }]}>
          🎮 {jogo.plataforma || 'Plataforma não informada'}
        </Text>
        <Text style={[styles.preco, { color: cores.primary }]}>
          {jogo.preco > 0 ? `R$ ${Number(jogo.preco).toFixed(2)}` : 'Grátis'}
        </Text>

        <Text style={[styles.labelDescricao, { color: cores.text }]}>Descrição / Sinopse</Text>
        <Text style={[styles.descricao, { color: cores.textSecondary }]}>
          {jogo.descricao || jogo.sinopse || 'Nenhuma descrição disponível para este jogo.'}
        </Text>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: jaFavoritado || adicionando ? cores.border : cores.primary }]}
          onPress={handleAdicionarFavorito}
          disabled={adicionando || jaFavoritado}
          activeOpacity={0.8}
        >
          <Text style={{ color: cores.primaryText, fontWeight: '700', fontSize: 15 }}>
            {adicionando ? 'Adicionando...' : jaFavoritado ? 'Já nos Favoritos' : 'Adicionar aos Favoritos'}
          </Text>
        </TouchableOpacity>

        {feedback && (
          <Text style={[styles.feedback, { color: corFeedback }]}>{feedback.texto}</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centrado: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 },
  container: { paddingBottom: 40 },
  capa: { width: '100%', height: 340 },
  conteudo: { padding: 20, gap: 8 },
  titulo: { fontSize: 22, fontWeight: '800', lineHeight: 28 },
  plataforma: { fontSize: 15 },
  preco: { fontSize: 20, fontWeight: '700', marginTop: 4 },
  labelDescricao: { fontSize: 16, fontWeight: '700', marginTop: 12 },
  descricao: { fontSize: 14, lineHeight: 22 },
  botao: { marginTop: 20, paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  feedback: { textAlign: 'center', fontSize: 14, fontWeight: '600' },
  texto: { fontSize: 15, textAlign: 'center' },
});