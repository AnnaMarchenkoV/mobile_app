import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts } from "../../src/store/actions/postActions";
import { getUser } from "../../src/store/actions/userActions";

import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";

import styles from "../../styles";

const Posts = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const items = useSelector((state) => state.posts.items);
  const numberOfElements = useSelector((state) => state.posts.numberOfElements);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);

  useEffect(() => getData(), [getData]);

  const getData = useCallback(() => {
    if (!loading && !isListEnd) {
      setLoading(true);
      dispatch(fetchPosts(offset));

      if (numberOfElements === 0 || items.length < numberOfElements) {
        setOffset(offset + 1);
        setLoading(false);
        
      } else {
        setIsListEnd(true);
        setLoading(false);
      }
    }
  }, [dispatch, offset]);

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  };

  const ItemView = ({ item }) => {
    const tagsArray = [];

    const getCurrentUser = () => {
      dispatch(getUser(item.userId));
      navigation.navigate("current-user-page", { userId: item.userId });
    }

    for (let i = 0; i < item?.tags.length; i += 1) {
      tagsArray.push(item.tags[i].title);
    }
    return (
      <View>
        <Text>{item.title}</Text>

        <Text>{item.description}</Text>

        <TouchableOpacity onPress={getCurrentUser}>
        <Text style={styles.userName}>{item.username}</Text>
        </TouchableOpacity>

        <Text>
          #
          {item?.tags[0]?.title ? tagsArray?.join(" #") : item?.tags.join(" #")}
        </Text>

        <Image source={{ uri: item.image }} style={styles.postImage} />
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        ListFooterComponent={renderFooter}
        onEndReached={getData}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

export default Posts;
