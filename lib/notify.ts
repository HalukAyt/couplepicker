// src/lib/notify.ts
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function ensureNotificationPermission() {
  const settings = await Notifications.getPermissionsAsync();
  if (settings.status !== 'granted') {
    const req = await Notifications.requestPermissionsAsync();
    if (req.status !== 'granted') {
      throw new Error('Bildirim izni verilmedi');
    }
  }
  // Android için kanal (ilk kurulumda iyi olur)
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
}

export function getTonightAt(hour: number, minute: number) {
  const now = new Date();
  const target = new Date();
  target.setHours(hour, minute, 0, 0);
  // Saat geçtiyse yarına kur
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }
  return target;
}

export async function scheduleMovieReminder(title: string, when: Date) {
  await ensureNotificationPermission();
  return Notifications.scheduleNotificationAsync({
    content: {
      title: '🎬 Film zamanı!',
      body: `${title} için hatırlatma zamanı.`,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE, // ✅ enum değeri
      date: when,
    },
  });
}
