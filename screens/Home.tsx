import { View, Text, Button } from 'react-native';
import useLocal from '../store/useLocal';
import type { Prefs } from '../lib/rank';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }: any) {
  const [prefs, setPrefs] = useLocal<Prefs>('prefs', {
    maxMinutes: 120,
    genres: ['romance','comedy'],
    platforms: ['Netflix'],
    moods: ['romantik','hafif'],
  });

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Tercihler</Text>
      <Text>Maks süre: {prefs.maxMinutes} dk</Text>
      <View style={{ flexDirection:'row', gap:8 }}>
        <Button title="+10 dk" onPress={() => setPrefs({ ...prefs, maxMinutes: prefs.maxMinutes + 10 })} />
        <Button title="-10 dk" onPress={() => setPrefs({ ...prefs, maxMinutes: Math.max(60, prefs.maxMinutes - 10) })} />
      </View>
      <Button title="Romantik+Komedi" onPress={() => setPrefs({ ...prefs, genres:['romance','comedy'] })} />
      <Button title="Platform: Netflix" onPress={() => setPrefs({ ...prefs, platforms:['Netflix'] })} />
      <Button title="Mood: Romantik" onPress={() => setPrefs({ ...prefs, moods:['romantik'] })} />

      <View style={{ height: 12 }} />
      <Button title="Kartları Gör (Swipe)" onPress={() => navigation.navigate('Swipe')} />
      <Button title="Eşleşmeler" onPress={() => navigation.navigate('Matches')} />
        <Button
  title="Sıfırla"
  onPress={() => {
    AsyncStorage.multiRemove(['likesA','likesB','idx','turn']);
    alert("Oyun sıfırlandı!");
  }}
/>
    </View>
  );
}
