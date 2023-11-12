import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TextInput,
} from "react-native";

import CoinItem from "./components/CoinItem";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");


  const loadData = async () => {
    const res = await fetch(
      "https://api.binance.com/api/v3/ticker/24hr"
    );
    const data = await res.json();
    console.log(data);
    setCoins(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <NavigationContainer>
    <View style={styles.container}>
      <StatusBar backgroundColor="#141414" />

      <View style={styles.header}>
        <Text style={styles.title}>CryptoMarket</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search a Coin"
          placeholderTextColor="#858585"
          onChangeText={(text) => text && setSearch(text)}
        />
      </View>

      <FlatList
        style={styles.list}
        data={coins.filter(
          (coin) =>
            coin.symbol.toLocaleLowerCase().includes("usdt") &&
            coin.symbol.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
           
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          
          <TouchableOpacity onPress={() => handleCoinPress(item)}>
            <CoinItem coin={item} />
          </TouchableOpacity>
        )}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await loadData();
          setRefreshing(false);
        }}
      />
    </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    marginTop: 10,
  },
  list: {
    width: "90%",
  },
  searchInput: {
    color: "#fff",
    borderBottomColor: "#4657CE",
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "center",
  },
});

export default App;
