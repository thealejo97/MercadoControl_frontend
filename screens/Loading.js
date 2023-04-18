import React from 'react';
import { View, ActivityIndicator,StyleSheet } from 'react-native';

const Loading = () => {
    return (
    <View style={[styles.container, styles.horizontal, styles.overlay]}>
        <ActivityIndicator size="large" color="#00ff00" />
    </View>
      );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
      },

    });
      
export default Loading;
