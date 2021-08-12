import AsyncStorage from '@react-native-async-storage/async-storage';
const DECKS_STORAGE_KEY= 'Udacity:decks'

export function getDecks () {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(JSON.parse);
}

export const getDeck = (title) => {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(res => {
            const data = JSON.parse(res);
            return data[title];
        });
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: [],
        },
    }));
}

export function addCardToDeck(title, {question, answer}) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(results => {
            const data = JSON.parse(results);
            data[title].questions = [...data[title].questions, {question, answer}];
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        });
}

export function deleteDeck(key) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(results => {
            const data = JSON.parse(results);
            data[key] = undefined;
            delete data[key];
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        });
}