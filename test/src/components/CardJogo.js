import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function CardJogo({ jogo, onPress, cores }) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}
      onPress={() => onPress(jogo.id)}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: jogo.capa || jogo.imagem }} 
        style={styles.capa} 
        resizeMode="cover" 
      />
      <View style={styles.info}>
        <Text style={[styles.titulo, { color: cores.text }]} numberOfLines={2}>
          {jogo.titulo || jogo.nome}
        </Text>
        <Text style={[styles.plataforma, { color: cores.textSecondary }]} numberOfLines={1}>
          {jogo.plataforma || jogo.desenvolvedora || 'Jogo'}
        </Text>
        <Text style={[styles.preco, { color: cores.primary }]}>
          {jogo.preco > 0 ? `R$ ${Number(jogo.preco).toFixed(2)}` : 'Grátis'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  capa: {
    width: 80,
    height: 120,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    gap: 4,
  },
  titulo: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  plataforma: {
    fontSize: 13,
  },
  preco: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },
});