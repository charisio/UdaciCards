import React from 'react'
import { Platform } from 'react-native'
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const NOTIFICATION_KEY ='UdaciCards:notifications'

export function clearLocalNotifications() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(() => Platform.OS !== 'web' && Notifications.cancelAllScheduledNotificationsAsync());
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
})

const grantAccessAndScheduleNotification = async ({status: existingStatus}) => {
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const {status} = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
    } else {
        if (Platform.OS === 'web') {
            alert('Must use physical device for Push Notifications');
        }
        await Notifications.cancelAllScheduledNotificationsAsync();

        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Complete a  quiz!',
                body: 'Hey! 👋 Don\'t forget to complete a quiz for today!',
            },
            trigger: {
                hour: 18,
                minute: 0,
                repeats: true
            }
        });
        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
    }
}

export const setLocalNotification = () => {
    if (Constants.isDevice && Platform.OS !== 'web') {
        AsyncStorage.getItem(NOTIFICATION_KEY)
            .then(JSON.parse)
            .then((data) => {
                if (data === null) {
                    Notifications.getPermissionsAsync().then(grantAccessAndScheduleNotification);
                }
            });
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
}