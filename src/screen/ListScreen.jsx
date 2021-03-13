import React from 'react'
import { View, Text, FlatList, StyleSheet, StatusBar, RefreshControl } from 'react-native';
import { getUsers } from '../../service'
import FastImage from 'react-native-fast-image'

function ListScreen() {
  const [allUsers, setAllUsers] = React.useState([])
  const [refreshing, setRefreshing] = React.useState()
  const [pageInformation, setPageInformation] = React.useState({ actualPage: 1, docCap: false })

  const Item = ({ item }) => (
    <View style={styles.item}>
      <FastImage source={{ uri: item.avatar }} style={styles.image} />
      <Text style={styles.title}>{item.first_name} {item.last_name}</Text>
    </View>);

  const loadMore = () => {
    setPageInformation(parameters => ({ ...parameters, actualPage: parameters.actualPage + 1 }))
  }

  const retrieveUsers = async () => {
    if (!pageInformation.docCap) {
      try {
        setRefreshing(true)
        const users = await getUsers(pageInformation.actualPage.toString())
        if (users.page <= users.total_pages) {
          setAllUsers(allUsers => [...allUsers, ...users.data])
          if (users.page === users.total.pages) {
            setPageInformation(parameters => ({ ...parameters, docCap: true }));
          }
        }
      }
      catch (error) {
        console.log(error)
      }
      setRefreshing(false)
    }
  }

  const _handleRefresh = () => { 
    setRefreshing(true);
    setAllUsers([]);
    setPageInformation({actualPage: 1, docCap: false })
  }

  React.useEffect(() => {
    retrieveUsers()
  }, [pageInformation.actualPage])

  return (
    <FlatList
      data={allUsers}
      renderItem={Item}
      keyExtractor={item => item.id.toString()}
      onEndReached={loadMore}
      onEndReachedThreshold={0.1}
      scrollEnabled
      initialNumToRender={5}
      refreshing={refreshing}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={_handleRefresh}
        />
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    marginVertical: 8,
    marginHorizontal: 16,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: 16,
  },
  image: {
    height: 55,
    width: 55,
    borderRadius: 32.5,
    marginRight: 15
  }
});


export default ListScreen;