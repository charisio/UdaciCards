import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const TextButton = ({children, onPress, disabled, style = {}}) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <Text style={style}>{children}</Text>
        </TouchableOpacity>
    );
}

export default TextButton;

