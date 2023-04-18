import React from 'react';
import { View, ActivityIndicator,StyleSheet } from 'react-native';

const Loading = () => {
       /*
        * Loading view, show a loading over all the view

            Created by: Alejandro Montaño
            Date: 17-04-2023
     */
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
