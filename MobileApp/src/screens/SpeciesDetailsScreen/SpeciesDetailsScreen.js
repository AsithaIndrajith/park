import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
} from 'react-native';
import {CardComponent} from '../../components/CardComponent/CardComponent';
import {ScrollView} from 'react-native-gesture-handler';

class SpeciesDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {photos: []};
  }

  static navigationOptions = ({navigation}) => {
    const {params = []} = navigation.state;
    return {
      headerTitle: params.content[0],
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: '#014421',
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.profileConatiner}
          source={{uri: this.props.navigation.getParam('content')[2]}}>
          <Text style={styles.title}>
            {this.props.navigation.getParam('content')[0]}
          </Text>
          <Text style={styles.subtitle}>
            {this.props.navigation.getParam('content')[1]}
          </Text>
        </ImageBackground>
        <ScrollView>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              textAlign: 'center',
              margin: 12,
            }}>
            {this.props.navigation.getParam('content')[3]}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              textAlign: 'right',
              margin: 12,
            }}>
            source: www.wikipedia.org
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: '#014421',
  },
  profileConatiner: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 270,
    resizeMode: 'contain',
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
export default SpeciesDetailsScreen;
