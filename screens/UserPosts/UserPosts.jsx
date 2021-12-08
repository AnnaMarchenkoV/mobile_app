import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/core";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";

import { currentPosts } from "../../src/store/actions/postActions";

import styles from "../../styles";

const UserPosts = () => {
  const route = useRoute();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const items = useSelector((state) => state.posts.userItems);
  const id = useSelector((state) => state.user.userData?.id);
  const currentUser = useSelector((state) => state.user.currentUser);
  const numberOfElements = useSelector((state) => state.posts.numberOfElements);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const userId = route.params?.userId || id;

  useEffect(() => {
    if (userId) {
      getData();
    }
  }, [getData]);

  const getData = useCallback(() => {
    if (!loading && !isListEnd) {
      setLoading(true);
      dispatch(currentPosts({ userId, offset }));
      if (numberOfElements === 0 || items.length < numberOfElements) {
        setOffset(offset + 1);
        setLoading(false);
      } else {
        setIsListEnd(true);
        setLoading(false);
      }
    }
  }, [dispatch, userId, offset]);

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  };

  const ItemView = useCallback(({ item }) => {
    const tagsArray = item?.tags.map((tag) => tag?.title || tag);

    return (
      <View>
        <Text style={styles.item}>{item.title}</Text>

        <Text>{item.description}</Text>

        <Text>{item.username}</Text>

        <Text>
          #
          {item?.tags[0]?.title ? tagsArray?.join(" #") : item?.tags.join(" #")}
        </Text>

        <Image source={{ uri: item.image }} style={styles.postImage} />
      </View>
    );
  }, []);

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
      <FlatList
        extraData={items}
        data={items}
        keyExtractor={(item, index) => item.id}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        ListFooterComponent={renderFooter}
        onEndReached={getData}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

export default UserPosts;
