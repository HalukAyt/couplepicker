// screens/Matches.tsx
import React from 'react';
import { View, Text, Button, Alert, Image, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useLocal from '../store/useLocal';
import { MOVIES } from '../data/movies';
import { rankMatches, weightedPick, type Prefs } from '../lib/rank';

export default function Matches({ navigation }: any) {
  const [likesA] = useLocal<string[]>('likesA', []);
  const [likesB] = useLocal<string[]>('likesB', []);
  const [prefs]  = useLocal<Prefs>('prefs', {
    maxMinutes: 120,
    genres: ['romance','comedy'],
    platforms: ['Netflix'],
    moods: ['romantik','hafif'],
  });

  const setB = new Set(likesB);
  const both = MOVIES.filter(m => likesA.includes(m.id) && setB.has(m.id));
  const ranked = rankMatches(both, prefs);

  const onRandom = () => {
    const pick = weightedPick(ranked);
    Alert.alert('Bu akşam:', pick.title);
  };

  const onReset = async () => {
    await AsyncStorage.multiRemove(['likesA','likesB','idx','turn']);
    navigation.navigate('Home');
  };

  if (ranked.length === 0) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={styles.title}>Henüz eşleşme yok 😢</Text>
        <Text style={{ marginTop: 6 }}>
          İkinizin de aynı filmi <Text style={{ fontWeight: '700' }}>beğenmesi</Text> gerekiyor.
        </Text>
        <Text style={{ marginTop: 6 }}>
          Şu ana kadar: A {likesA.length} 👍 | B {likesB.length} 👍
        </Text>
        <View style={{ height: 16 }} />
        <Button title="Kartlara dön" onPress={() => navigation.navigate('Swipe')} />
        <View style={{ height: 8 }} />
        <Button title="🔄 Yeni tur başlat" onPress={onReset} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>Eşleşmeler ({ranked.length})</Text>
      <View style={{ height: 8 }} />
      {ranked.map(m => (
        <View key={m.id} style={styles.card}>
          <Image source={{ uri: m.poster }} style={styles.poster} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{m.title}</Text>
            <Text style={styles.meta}>
              {m.genres.join(' • ')} | {m.platforms.join(' • ')} • {m.minutes} dk
            </Text>
            <Text style={styles.score}>Skor: {m.score.toFixed(1)}</Text>
          </View>
        </View>
      ))}

      <View style={{ height: 12 }} />
      <Button title="🎲 Kararsız kaldık" onPress={onRandom} />
      <View style={{ height: 8 }} />
      <Button title="🔄 Yeni tur başlat" onPress={onReset} />
      <View style={{ height: 8 }} />
      <Button title="⬅️ Kartlara dön" onPress={() => navigation.navigate('Swipe')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '700' },
  card: {
    flexDirection: 'row',
    gap: 12,
    padding: 10,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  poster: { width: 80, height: 120, borderRadius: 8 },
  name: { fontSize: 16, fontWeight: '600' },
  meta: { fontSize: 12, color: '#666', marginTop: 2 },
  score: { fontSize: 12, color: '#333', marginTop: 6, fontWeight: '600' },
});
