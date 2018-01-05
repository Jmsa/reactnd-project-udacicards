import {Notifications, Permissions} from 'expo';
import {View, StyleSheet, AsyncStorage} from 'react-native';


export function createArrayFromObject(obj) {
    const newArray = [];
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            newArray.push(obj[prop]);
        }
    }
    return newArray;
}

// Given an array return and object where the key can be specified and the entire item at index
// is the property.
export function createObjectFromArray(arr, k = 'id') {

    if (!arr || arr.length === 0) {
        return {};
    }

    // Create an object from each item in the array - using the id as key to match.
    const objects = arr.map((d) => {
        return {
            [d[k]]: d
        }
    });

    // Merge the objects into 1.
    return Object.assign(...objects);
}


const NOTIFICATION_KEY = 'UdaciCards:notifications';

export function getDailyReminderValue() {
    return {
        today: "👋 Don't forget to log your data today!"
    }
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'Log your stats!',
        body: "👋 don't forget to log your stats for today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}


export function setLocalNotification() {
    try {
        AsyncStorage.getItem(NOTIFICATION_KEY)
            .then(JSON.parse)
            .then(data => {
                if (data === null) {
                    Permissions.askAsync(Permissions.NOTIFICATIONS)
                        .then(({status}) => {
                            if (status === 'granted') {
                                Notifications.cancelAllScheduledNotificationsAsync();
                                let soon = new Date();
                                soon.setSeconds(soon.getSeconds() + 10);
                                let tomorrow = new Date();
                                tomorrow.setDate(tomorrow.getDate() + 1);
                                tomorrow.setHours(20);
                                tomorrow.setMinutes(0);
                                Notifications.scheduleLocalNotificationAsync(
                                    {
                                        title: 'Reminder',
                                        body: `Don't forget to complete a quiz.`
                                    },
                                    {
                                        time: soon,
                                        repeat: 'minute'
                                    }
                                );
                                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                            }
                        });
                }
            })
    }
    catch (error) {
        console.log(error);
    }
}


const styles = StyleSheet.create({
    iconContainer: {
        padding: 5,
        borderRadius: 8,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20
    },
});