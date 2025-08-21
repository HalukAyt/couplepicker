import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import { MOVIES } from '../data/movies';
import useLocal from '../store/useLocal';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = 0.25 * width;

export default function Swipe({ navigation }: any) {
  const [turn, setTurn] = useLocal<'A' | 'B'>('turn', 'A');
  const [idx, setIdx] = useLocal<number>('idx', 0);
  const [likesA, setLikesA] = useLocal<string[]>('likesA', []);
  const [likesB, setLikesB] = useLocal<string[]>('likesB', []);

  const matchOpacity = useSharedValue(0); // 🎉 banner için
  const movie = MOVIES[idx];

  const translateX = useSharedValue(0);
  const rotate = useSharedValue('0deg');

  const notifyMatch = () => {
    matchOpacity.value = withTiming(1, { duration: 200 }, () => {
      matchOpacity.value = withTiming(0, { duration: 600 });
    });
  };

  const saveLike = (mId: string) => {
    const isMatch = turn === 'A' ? likesB.includes(mId) : likesA.includes(mId);

    if (turn === 'A') {
      setLikesA(prev => Array.from(new Set([...prev, mId])));
    } else {
      setLikesB(prev => Array.from(new Set([...prev, mId])));
    }

    if (isMatch) {
      notifyMatch(); // ✅ direkt çağır (runOnJS gerek yok)
    }
  };

  const nextCard = () => {
    if (turn === 'A') {
      setTurn('B');               // aynı kart B'ye
    } else {
      setTurn('A');
      setIdx(idx + 1);            // yeni karta geç
    }
    translateX.value = 0;
    rotate.value = '0deg';
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx: any) => {
      translateX.value = ctx.startX + event.translationX;
      rotate.value = `${translateX.value / 20}deg`;
    },
    onEnd: () => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        const dir = translateX.value > 0 ? 'right' : 'left';
        if (dir === 'right') runOnJS(saveLike)(movie.id);
        runOnJS(nextCard)();
      } else {
        translateX.value = withSpring(0);
        rotate.value = withSpring('0deg');
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: rotate.value },
    ] as const,
  }));

  const matchStyle = useAnimatedStyle(() => ({
    opacity: matchOpacity.value,
  }));

  if (!movie) {
    return (
      <View style={styles.center}>
        <Text>Tüm kartlar bitti 🎉</Text>
        <Text style={{ marginTop: 8 }} onPress={() => navigation.navigate('Matches')}>
          → Eşleşmelere git
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 8 }}>Sıra: {turn}</Text>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.card, cardStyle]}>
          <Image source={{ uri: movie.poster }} style={styles.poster} />
          <Text style={styles.title}>{movie.title}</Text>
          <Text>{movie.genres.join(' • ')} | {movie.platforms.join(' • ')}</Text>
          <Text>{movie.minutes} dk</Text>
        </Animated.View>
      </PanGestureHandler>

      {/* 🎉 MATCH BANNER — RETURN İÇİNDE, en üstte görünmesi için absolute + zIndex */}
      <Animated.View
        pointerEvents="none"
        style={[styles.matchBadge, matchStyle]}
      >
        <Text style={styles.matchText}>🎉 EŞLEŞME!</Text>
      </Animated.View>

      {/* hint kutucuğu */}
      <View style={styles.hintBox}>
        <Text style={styles.hintText}>
          👉 sağa kaydır = <Text style={styles.likeHint}>beğen</Text> |{' '}
          sola kaydır = <Text style={styles.passHint}>geç</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16,
  },
  card: {
    width: width - 40,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  poster: {
    width: '100%', height: 320, borderRadius: 12, marginBottom: 12,
  },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 4 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  // hint
  hintBox: {
    marginTop: 30,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  hintText: { fontSize: 13, color: '#444', textAlign: 'center' },
  likeHint: { color: 'green', fontWeight: '600' },
  passHint: { color: 'red', fontWeight: '600' },

  // 🎉 match banner
  matchBadge: {
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#222',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    zIndex: 999,     // iOS
    elevation: 999,  // Android
  },
  matchText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
