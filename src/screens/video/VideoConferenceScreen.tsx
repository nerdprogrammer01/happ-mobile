import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  PermissionsAndroid
} from 'react-native';

import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo
} from 'react-native-twilio-video-webrtc'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { FabButton, ButtonPrimary } from '../../components/buttons';
import { Theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: 'white'
  },
  callContainer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: 'white'
  },
  button: {
    marginTop: 100
  },
  localVideo: {
    flex: 1,
    width: 150,
    height: 150,
    position: "absolute",
    //right: 10,
    bottom: 75
  },
  remoteGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: 'wrap'
  },
  remoteVideo: {
    marginTop: 20,
    //marginLeft: 10,
    //marginRight: 10,
    width: "100%",
    height: 250,
  },
  optionsContainer: {
    flex:1,    
    position: "absolute",
    //left: 0,
    bottom: 0,
    right: 0,
    height: 80,
   // backgroundColor: 'blue',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionButton: {
    marginLeft: 10,
    marginRight: 10,
    //borderRadius: 100 / 2,
  //  backgroundColor: 'grey',
   // justifyContent: 'center',
    //alignItems: "stretch",
    borderColor:Theme.colors.primaryColor, 
    borderWidth:1
  },
  infoText: {
    color:Theme.colors.primaryColor, 
    fontSize:17,
    justifyContent: 'center',
    alignItems:"center",
    fontWeight: "400",
  }
});

const requestRecordAudioPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: "Record and Audio Permission",
        message:
          "Myspace needs access to your audio " +
          "to work effectively.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the audio");
    } else {
      console.log("Audio permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Record and Audio Permission",
        message:
          "Myspace needs access to your camera " +
          "to work effectively.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the audio");
    } else {
      console.log("Audio permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};
 

//const route = useRoute();

export default class VideoConferenceScreen extends Component {

  constructor(props){
    super(props);
  }

  state = {
    isAudioEnabled: true,
    isVideoEnabled: true,
    status: 'disconnected',
    participants: new Map(),
    videoTracks: new Map(),
    token: this.props.route.params["session_token"]
  }

 async  componentDidMount() {
     await requestRecordAudioPermission()
     await requestCameraPermission()
     await this._onConnectButtonPress
  }

  _onConnectButtonPress = async () => {
    await this.refs.twilioVideo.connect({ accessToken: this.state.token })
    console.log(this.state.token)
    this.setState({status: 'connecting'})
  }

  _onEndButtonPress = () => {
    this.refs.twilioVideo.disconnect()
  }

  _onMuteButtonPress = () => {
    this.refs.twilioVideo.setLocalAudioEnabled(!this.state.isAudioEnabled)
      .then(isEnabled => this.setState({isAudioEnabled: isEnabled}))
  }

  _onFlipButtonPress = () => {
    this.refs.twilioVideo.flipCamera()
  }

  _onRoomDidConnect = () => {
    this.setState({status: 'connected'})
  }

  _onRoomDidDisconnect = ({error}) => {
    console.log("ERROR: ", error)

    this.setState({status: 'disconnected'})
  }

  _onRoomDidFailToConnect = (error) => {
    console.log("ERROR: ", error)

    this.setState({status: 'disconnected'})
  }

  _onParticipantAddedVideoTrack = ({participant, track}) => {
    console.log("onParticipantAddedVideoTrack: ", participant, track)

    this.setState({
      videoTracks: new Map([
        ...this.state.videoTracks,
        [track.trackSid, { participantSid: participant.sid, videoTrackSid: track.trackSid }]
      ]),
    });
  }

  _onParticipantRemovedVideoTrack = ({participant, track}) => {
    console.log("onParticipantRemovedVideoTrack: ", participant, track)

    const videoTracks = this.state.videoTracks
    videoTracks.delete(track.trackSid)

    this.setState({ videoTracks: new Map([ ...videoTracks ]) });
  }

  render() {
    return (
      <View style={[styles.container,{margin:10}]}>
        {
          this.state.status === 'disconnected' &&
          <View>
            <Text style={styles.welcome}>
              My Session Room
            </Text>
            <Text style={styles.infoText}>When you are ready, please click the button below to start your session.</Text>
            <ButtonPrimary
              title="Start Video Session"
              style={styles.button}
              onPress={this._onConnectButtonPress}>
            </ButtonPrimary>
          </View>
        }

        {
          (this.state.status === 'connected' || this.state.status === 'connecting') &&
            <View style={styles.callContainer}>
            {
              this.state.status === 'connected' &&
              <View style={styles.remoteGrid}>
                {
                  Array.from(this.state.videoTracks, ([trackSid, trackIdentifier]) => {
                    return (
                      <TwilioVideoParticipantView
                        style={styles.remoteVideo}
                        key={trackSid}
                        trackIdentifier={trackIdentifier}
                      />
                    )
                  })
                }
              </View>
            }
            <View
              style={styles.optionsContainer}>
           
              <FabButton onPress={this._onEndButtonPress} icon="ios-close" style={styles.optionButton} />
              <FabButton onPress={this._onMuteButtonPress} icon={this.state.isAudioEnabled ? "ios-mic-off" : "ios-mic"} style={styles.optionButton} />
              <FabButton onPress={this._onFlipButtonPress} icon="ios-reverse-camera" style={styles.optionButton} />

           
              
            </View>
            <TwilioVideoLocalView
                enabled={true}
                style={styles.localVideo}
              />
          </View>
        }

        <TwilioVideo
          ref="twilioVideo"
          onRoomDidConnect={ this._onRoomDidConnect }
          onRoomDidDisconnect={ this._onRoomDidDisconnect }
          onRoomDidFailToConnect= { this._onRoomDidFailToConnect }
          onParticipantAddedVideoTrack={ this._onParticipantAddedVideoTrack }
          onParticipantRemovedVideoTrack= { this._onParticipantRemovedVideoTrack }
        />
      </View>
    );
  }
}