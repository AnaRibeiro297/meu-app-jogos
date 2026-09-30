import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTema } from "../contexts/ThemeContext";
import {
  listarGameFavoritos,
  editarGame,
  removerListaGame,
} from "../services/api";
import ItemGameFavorito from "../components/ItemGameFavorito";

export default function Favoritos() {
  const { cores } = useTema();

  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await listarFavoritos();
      setFavoritos(dados);
    } catch (err) {
      setErro(err.message || "Erro ao carregar os jogos favoritos.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  async function handleEditar(id, observacao) {
    try {
      const jogoAtualizado = await editarFavorito(id, observacao);
      setFavoritos((listaAnterior) =>
        listaAnterior.map((item) =>
          item.id === id ? { ...item, ...jogoAtualizado } : item
        )
      );
    } catch (err) {
      Alert.alert("Erro", "Não foi possível atualizar a observação.");
      throw err;
    }
  }

  async function handleRemover(id) {
    try {
      await removerFavorito(id);
      setFavoritos((listaAnterior) =>
        listaAnterior.filter((item) => item.id !== id)
      );
    } catch (err) {
      Alert.alert("Erro", "Não foi possível remover o jogo dos favoritos.");
    }
  }

  if (carregando) {
    return (
      <View style={[styles.centrado, { backgroundColor: cores.background }]}>
        <ActivityIndicator size="large" color={cores.primary} />
        <Text style={[styles.textoCentro, { color: cores.textSecondary }]}>
          Carregando favoritos...
        </Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={[styles.centrado, { backgroundColor: cores.background }]}>
        <Text style={[styles.textoCentro, { color: cores.error }]}>
          Erro: {erro}
        </Text>
        <TouchableOpacity
          style={[styles.botaoTentar, { backgroundColor: cores.primary }]}
          onPress={carregar}
        >
          <Text style={{ color: cores.primaryText, fontWeight: "600" }}>
            Tentar novamente
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (favoritos.length === 0) {
    return (
      <View style={[styles.centrado, { backgroundColor: cores.background }]}>
        <Text style={[styles.textoCentro, { color: cores.textSecondary }]}>
          Nenhum jogo favoritado ainda.{"\n"}Explore o catálogo para adicionar seus jogos preferidos!
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: cores.background }]}>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ItemGameFavorito
            item={item}
            cores={cores}
            onEditar={handleEditar}
            onRemover={handleRemover}
          />
        )}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centrado: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 24,
  },
  lista: {
    padding: 16,
    gap: 12,
  },
  textoCentro: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  botaoTentar: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
});