import React, {Component} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
export default class App extends Component {
  state = {
    visible: false,
  };

  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Dialog visible={this.props.showIndicator}>
          <Dialog.Content style>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator
                style={{position: 'absolute'}}
                size="large"
                color="#4b8b3b"
              />
              {/* <Text style={{marginLeft: 10}}>{this.props.title}</Text> */}
            </View>
          </Dialog.Content>
        </Dialog>
      </View>
    );
  }
}
