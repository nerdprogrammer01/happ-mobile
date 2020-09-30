


// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { View, TouchableOpacity, Text,TextInput,Button,Platform } from "react-native";
// import Modal from "react-native-modal";
// //import LinearGradient from "react-native-linear-gradient";
// import StarRating from "react-native-star-rating";
// //import { useNavigation } from "@react-navigation/native";
// import TextArea from "@freakycoder/react-native-text-area";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import DateTimePicker from '@react-native-community/datetimepicker';


// import { styles } from "../styles";
// type TProps = {
//     isVisible: boolean;
//     onDismissModal: () => void;
//     onCloseModal : () => void;
  
 
//   };
// export const ShowAppointmentCalender: React.FC<TProps> = props => {
//     const navigation = useNavigation();
//     const route = useRoute();
//     //const [date, setDate] = useState(new Date())

//     const [date, setDate] = useState(new Date());
//   const [mode, setMode] = useState('date');
//   const [show, setShow] = useState(false);
//   const [time, setTime] = useState(new Date());
// const [endTime, setEndTime] = useState(new Date());
//   const onChange = (event, selectedValue) => {
//     setShow(Platform.OS === 'ios');
//     if (mode == 'date') {
//       const currentDate = selectedValue || new Date();
//       setDate(currentDate);
//       setMode('time');
//       //setShow(Platform.OS !== 'ios'); // to show the picker again in time mode
//     } else{
//       const selectedTime = selectedValue || new Date();
//       setTime(selectedTime);
//       setEndTime(selectedTime);
//       setShow(Platform.OS === 'ios');
//       setMode('date');
//     }
//   };
// console.log("xx"+ time);




// //   setTime(currentTime);
// //   setShow(Platform.OS === 'ios' ? true : false);
// // };

//   const showMode = currentMode => {
//     setShow(true);
//     setMode(currentMode);
//   };

//   const showDatePicker = () => {
//     showMode('date');
//   };

//   const showTimepicker = () => {
//     showMode('time');
//   };

  
//   const showTimeEnd = () => {
//     showMode('time');
//   };


//   const formatDate = (date) => {
//     return `${date.getDate()}/${date.getMonth() +
//       1}/${date.getFullYear()}`;
//   };

//   const formatTime = (time) => {
//     return `${time.getHours()}:${time.getMinutes()}`;
//   };


//   const formatTimes = (endTime) => {
//     return `${endTime.getHours()}:${endTime.getMinutes()}`;
//   };

// //${time.getTime()}
// return (
//   <View style={{ flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 55}}>
//       <Modal
//          isVisible={props.isVisible}
//              swipeDirection={"down"}
//             // style={styles.modalView}
//              onSwipeComplete={props.onDismissModal}
//              onBackdropPress={props.onDismissModal}
//       >
//         <View style={{ flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22}}>
//           <View style={{
//             margin: 20,
//             backgroundColor: "white",
//             borderRadius: 20,
//             padding: 100,
//             alignItems: "center",
//             shadowColor: "#000",
//             shadowOffset: {
//               width: 0,
//               height: 2
//             }
//           }}>
//           <Text>Date</Text>
//           <View>
//       <View>
//              <TouchableOpacity onPress={showDatePicker}>
//           <Text>{formatDate(date)}</Text>
//         </TouchableOpacity>

//       </View>
//       {show && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           timeZoneOffsetInMinutes={0}
//           value={date}
//           mode={mode}
//           is24Hour={true}
//           display="default"
//           onChange={onChange}
//         />
//       )}
//     </View>
//      <Text>Start Time</Text>
//      <View>
//      <TouchableOpacity onPress={showTimepicker}><Text>{formatTime(time)}</Text></TouchableOpacity>
//       </View>
//      <Text>End Time</Text>
//      <View>
//      <TouchableOpacity onPress={showTimeEnd}><Text>{formatTimes(endTime)}</Text></TouchableOpacity>
//      {/* <TouchableOpacity onPress={showTimepicker}><TextInput value={formatTime(time)} placeholder={formatTime(time)} onFocus={showTimepicker}/></TouchableOpacity> */}
//       </View>
//           </View>
//         </View>
//       </Modal>
    
     
//     </View>
// );
// }




import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Text,Platform,Button } from "react-native";
import Modal from "react-native-modal";
//import LinearGradient from "react-native-linear-gradient";
import StarRating from "react-native-star-rating";
//import { useNavigation } from "@react-navigation/native";
import TextArea from "@freakycoder/react-native-text-area";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';


import { styles } from "../styles";
type TProps = {
    isVisible: boolean;
    onDismissModal: () => void;
    onCloseModal : () => void;
  
 
  };
export const ShowAppointmentCalender: React.FC<TProps> = props => {
    const navigation = useNavigation();
    const route = useRoute();
    //const [date, setDate] = useState(new Date())

    const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [time, setTime] = useState(new Date());
const [endTime, setEndTime] = useState(new Date());
  const onChange = (event, selectedValue) => {
   
    setShow(Platform.OS === 'ios');
    if (mode == 'date') {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      setMode('time');
      //setShow(Platform.OS !== 'ios'); // to show the picker again in time mode
    } else{
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
      //setShow(Platform.OS === 'ios');
      setMode('date');
    }
  };
  const onChanges = (event, selectedValue) => {
  
    setShow1(Platform.OS === 'ios');
    if (mode == 'date') {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      setMode('time');
     // setShow(Platform.OS !== 'ios'); // to show the picker again in time mode
    } else{
      const selectedTime = selectedValue || new Date();
      setEndTime(selectedTime);
   //   setShow1(Platform.OS === 'ios');
      setMode('date');
    }
  };

console.log("xx"+ time);
//console.log('utcCutoff:', time.format('YYYYMMDD hh:mm:ssa Z')); 
console.log("xx"+ endTime);


//   setTime(currentTime);
//   setShow(Platform.OS === 'ios' ? true : false);
// };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showModes = currentMode => {
    setShow1(true);
    setMode(currentMode);
  };




  const showDatePicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  
  const showTimeEnd = () => {
    showModes('time');
  };


  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()}`;
  };

  const formatTime = (time) => {
    return `${time.getHours()}:${time.getMinutes()}`;
  };


  const formatTimes = (endTime) => {
    return `${endTime.getHours()}:${endTime.getMinutes()}`;
  };

//${time.getTime()}
return (
  <View style={{ flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 55}}>
      <Modal
         isVisible={props.isVisible}
             swipeDirection={"down"}
            // style={styles.modalView}
             onSwipeComplete={props.onDismissModal}
             onBackdropPress={props.onDismissModal}
      >
        <View style={{ flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22}}>
          <View style={{
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 100,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            }
          }}>
          <Text>Date</Text>
          <View>
      <View>
             <TouchableOpacity onPress={showDatePicker}>
          <Text>{formatDate(date)}</Text>
        </TouchableOpacity>

      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
       {show1 && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChanges}
        />
      )}
    </View>
     <Text>Start Time</Text>
     <View>
     <TouchableOpacity style={{borderColor:'black',borderWidth:1}} onPress={showTimepicker}><Text>{formatTime(time)}</Text></TouchableOpacity>
      </View>
     <Text>End Time</Text>
     <View>
     <TouchableOpacity onPress={showTimeEnd}><Text>{formatTimes(endTime)}</Text></TouchableOpacity>
      </View>
      <Button
            onPress={() => props.onDismissModal()}
            title="ks"
           
          />
      </View>
      
      </View>

      </Modal>
    
     
    </View>
);
}
