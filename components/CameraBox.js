import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class CameraBox extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    showImage: false,
    imageUrl: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  clean = () => {
    console.log('clean image')
    this.setState({ showImage: false, imageUrl: null })
  }

  snap = async () => {
    if (this.camera) {
      console.log('snap!')
      let photo = await this.camera.takePictureAsync({quality: 0.1, base64: true, exif: true});
      let imageUrl = `data:image/jpg;base64,${photo.base64}`
      this.setState({ showImage: true, imageUrl: imageUrl })
      this.props.handleCamSnap(imageUrl);
    }
  };

  renderImage = () => {
    if (this.state.showImage){
      return(
        <View>
          <Image
            style={{width: 400, height: 400}}
            source={{uri: this.state.imageUrl }}
          />

          <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'right',
              }}
              onPress={() => {
                this.clean();
              }}>
             <Text style={{ fontSize: 18, marginBottom: 10, color: 'black' }}> Clean </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderCam = () => {
    if (!this.state.showImage){
      return(
        <Camera
          style={{ flex: 1 }}
          type={this.state.type}
          ref={ref => {
            this.camera = ref;
          }}
         >
        <View
          style={{
            flex: 1,
            height: 400,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
        </View>
        <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'right',
            }}
            onPress={() => {
              this.snap();
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Snap! </Text>
          </TouchableOpacity>
        </Camera>
      )
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          {this.renderImage()}
          {this.renderCam()}
        </View>
      );
    }
  }
}
