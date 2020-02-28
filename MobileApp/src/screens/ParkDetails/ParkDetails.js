import * as React from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {List, Avatar} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import ActivityIndicator from '../../components/ActivityIndicator/ActivityIndicator';
import {checkNet} from '../../components/NetInfo/NetInfo';

class ParkDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      species: [],
      activityIndicator: true,
    };
  }

  static navigationOptions = ({navigation}) => {
    const {params = []} = navigation.state;
    return {
      headerTitle: params.title,
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: '#014421',
    };
  };

  componentDidMount() {
    this.getParkDetails();
  }

  // updateParkDetails = async function() {
  //     const data = await database().ref(`/parks/anp`)
  //     data.push({
  //         name: 'Sri Lankan sambar deer',
  //         sname: 'Rusa unicolor unicolor',
  //         description: '',
  //         img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Sambar_%28Cervus_unicolor_unicolor%29_male.jpg/1920px-Sambar_%28Cervus_unicolor_unicolor%29_male.jpg'

  //     })
  // }

  getParkDetails = async function() {
    let hasNet = await checkNet();
    if (hasNet !== true) {
      Alert.alert(
        'Connectivity Error',
        'Please check your internet connectivity',
      );
    }

    const data = await database()
      .ref(`/parks/${this.props.navigation.getParam('code')}`)
      .orderByKey()
      .once('value');
    const snapshot = data.val();
    // console.log(snapshot)
    let species = [];
    for (let i in snapshot) {
      species.push([
        snapshot[i].name,
        snapshot[i].sname,
        snapshot[i].img,
        snapshot[i].description,
      ]);
    }

    await this.setState({
      species: species,
      activityIndicator: false,
    });
    // console.log(species)
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.profileConatiner}
          source={{uri: this.props.navigation.getParam('img')}}>
          <Text style={styles.title}>
            {this.props.navigation.getParam('title')}
          </Text>
          <Text style={styles.subtitle}>
            {this.props.navigation.getParam('subtitle')}
          </Text>
        </ImageBackground>
        {this.state.activityIndicator ? (
          <View style={{width: '100%', backgroundColor: 'grey'}}>
            <ActivityIndicator
              title={'Loading'}
              showIndicator={this.state.activityIndicator}
            />
          </View>
        ) : (
          <ScrollView style={{width: Dimensions.get('window').width}}>
            {this.state.species.map((val, i) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('SpeciesDetailsScreen', {
                      content: val,
                    })
                  }
                  key={i}
                  style={{
                    backgroundColor: '#014421',
                    marginLeft: 5,
                    marginRight: 5,
                    marginBottom: 2,
                    borderRadius: 10,
                  }}>
                  <List.Item
                    title={val[0]}
                    titleStyle={{fontSize: 23, color: 'white'}}
                    descriptionStyle={{fontSize: 15, color: 'white'}}
                    description={val[1]}
                    titleNumberOfLines={2}
                    right={props => (
                      <Avatar.Image
                        style={{
                          backgroundColor: '#F0FFFF',
                        }}
                        size={150}
                        source={{uri: val[2]}}
                      />
                    )}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    width: Dimensions.get('window').width,
  },
  profileConatiner: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 270,
    marginBottom: 5,
  },
  title: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
  },
  subtitle: {
    color: 'white',
    fontSize: 20,
  },
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
  },
});
export default ParkDetails;
