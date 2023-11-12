
import React from 'react';
import { View, Text } from 'react-native';

const CoinDetailScreen = ({ route }) => {
  const { coin } = route.params;

  return (
    
    <View>
      <Text>Coin Detail Screen</Text>
      <Text>{coin.symbol}</Text>
      {/* Add other details you want to display */}
    </View>
  );
};

export default CoinDetailScreen;
