import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Card, Text, Avatar} from 'react-native-paper';
import TimeAgo from 'react-native-timeago';

class CardComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Card
          style={{
            borderRadius: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Card.Title
            title={this.props.subtitle}
            subtitle={'@' + this.props.title}
            left={() => (
              <Avatar.Image size={40} source={{uri: this.props.user}} />
            )}
            right={() => (
              // <Avatar.Icon
              //   style={{backgroundColor: '#014421', marginRight: 5}}
              //   size={35}
              //   color="white"
              //   icon="shield-check"
              // />
              <TimeAgo
                time={
                  this.props.result !== undefined
                    ? this.props.result[0][1]
                    : this.props.content[0][1]
                }
              />
            )}
          />
          {this.props.isNavigate ? (
            <TouchableOpacity
              onPress={() =>
                this.props.showPhoto.navigate('showDetailedPhoto', {
                  img: this.props.image,
                  title: this.props.title,
                  subtitle: this.props.subtitle,
                  user: this.props.user,
                  content: this.props.result,
                  showPhoto: this.props.navigation,
                })
              }>
              <Card.Cover
                resizeMode="contain"
                style={styles.cover}
                source={{uri: this.props.image}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Card.Cover
                style={styles.cover}
                source={{uri: this.props.image}}
              />
            </TouchableOpacity>
          )}

          <Card.Content>
            {this.props.content.map((val, i) => {
              return val[0] === 'map-marker' ? (
                <TouchableOpacity
                  key={i}
                  style={styles.content}
                  onPress={() =>
                    this.props.showPhoto.navigate('showLocationScreen', {
                      location: val[1],
                    })
                  }>
                  <Avatar.Icon size={36} color="#014421" icon={val[0]} />
                  <Text> View location</Text>
                </TouchableOpacity>
              ) : (
                <View key={i} style={styles.content}>
                  <Avatar.Icon size={36} color="#014421" icon={val[0]} />
                  <Text> {val[1]}</Text>
                </View>
              );
            })}
          </Card.Content>
          <Card.Actions></Card.Actions>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    width: Dimensions.get('window').width,
  },
  cover: {
    height: 300,
    width: Dimensions.get('window').width - 10,
    borderRadius: 15,
  },
  content: {
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    fontSize: 15,
  },
});

export {CardComponent};
