import { StyleSheet } from 'react-native'
import { Theme } from "../theme";

const styles = StyleSheet.create({
    container: { flex: 1 },
    flex1: { flex: 1 },
    scrollContainer: { marginLeft: 10,marginRight:10 },
    imageStyle: {
      width: 130,
      height: 130,
      borderRadius: 36,
      borderColor: Theme.colors.primaryColor,
      borderWidth: 0.5,
      alignSelf: "center",
      marginTop: 16
    },
    nameText: {
      fontSize: 22,
      fontWeight: "600",
      marginTop: 16,
      color: Theme.colors.black
    },
    titleText: {
    
      fontSize: 22,
      fontWeight: "400",
      marginTop: 12,
      marginBottom:10,
      color: Theme.colors.primaryColor
    },

    headerButton: {
      color: Theme.colors.primaryColor
    },
    daysText: {
      alignSelf: "center",
      fontSize: 14,
      marginTop: 6,
      color: Theme.colors.black
    },
    menuRowContent: {
      flexDirection: "row",
     /*  paddingStart: 12, */
      paddingEnd: 16,
      paddingVertical: 16,
    /*   marginBottom:16,
      marginTop:16, */
      borderWidth:1,
      borderColor:Theme.colors.gray,
      margin:16,
      borderRadius:5
    },
    iconContent: {
      width: 32
    },
    menuRowsContent: { paddingHorizontal: 8, flex: 1 },
    menuRowTitle: {
      fontSize: 25,
      alignSelf: "center",
    },
    menuRowSubtitle: {
      fontSize: 12,
      marginTop: 4,
      alignSelf: "center",
      fontWeight: "800",
      color:Theme.colors.primaryColorDark
    },
    divider: { marginTop:5 },
    upcomingAppoinmentRow: {
      margin:5,
      marginHorizontal: 16
    },
    pickerstyle: {
      height: 50,
      alignSelf: 'stretch',
      borderWidth: 1,
      borderColor: Theme.colors.primaryColor,
      borderRadius: 5,
      marginTop: 10,
      
    },
    label_titleText: {
      fontSize: 17,
      fontWeight: "600",
      color: Theme.colors.black,
      paddingTop: 5
    },
    cost_categoryText: {
      fontSize: 17,
      fontWeight: "600",
      color: Theme.colors.primaryColor,
      paddingTop: 5
    },
    cost_serviceText: {
      fontSize: 15,
      fontWeight: "600",
      color: Theme.colors.black,
    },
    input: {
      height: 50,
      borderRadius: 5,
      borderColor: Theme.colors.primaryColor,
      borderWidth: 1,
      marginTop: 10,
      padding: 10,
  },   
  buttonStyle: {
    marginTop: 10,
    alignSelf: 'stretch',
    fontSize: 20,
  
  },
  add_buttonStyle: {
    marginTop: 10,
    alignSelf: 'flex-end',
    fontSize: 20,
  
  },
  drug_nameText: {
    fontSize: 18,
    fontWeight: "400",
    marginLeft: 10,
    color: Theme.colors.primaryColor
  },
  dosage_nameText: {
    fontSize: 15,
    fontWeight: "400",
    marginLeft: 10,
    marginBottom:5,
    color: Theme.colors.black
  },
  
  errorText: {
    fontSize: 15,
    fontWeight: "400",
    marginBottom:5,
    color: "red"
  },
  successText: {
    fontSize: 15,
    fontWeight: "400",
    marginBottom:5,
    color: "green"
  },
  input_left: {
    height: 50,
    borderRadius: 5,
    borderColor: Theme.colors.primaryColor,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    justifyContent: 'flex-start'
},
input_right: {
  height: 50,
  borderRadius: 5,
  borderColor: Theme.colors.primaryColor,
  borderWidth: 1,
  margin: 10,
  padding: 10,
  justifyContent: 'flex-end'
},

  });
  

  export {styles}