import {  View ,Alert} from "react-native";
import React, { useState, useEffect } from "react";
import RenderworkExperience from "./renderworkExperience";
import { useNavigation } from "@react-navigation/native";
import CustomSwipeListView from "../../../../../compounds/CustomSwipeListView";
import { API_DELETE_INDIVISUAL_WORKEXPER} from "../../../../../../config/WebService";
import ApiSauce from "../../../../../../services/ApiSauce";
import { checkEmptyFields,
  showToast,
  checkEmail,
  passwordValidatino,
  dispatch,
  navigationscreen, 
  lazyLoaderOff, lazyLoaderToggle,} from "../../../../../helper";


export default function WorkExperience({ data, slug }) {
  const navigation = useNavigation();


  useEffect(() => {
    setListData(data);
  }, [data]);

  const [listData, setListData] = useState(data);

  const onDelete = (item) => {
    let filter = listData.filter((x) => x.id !== item?.id);
    setTimeout(() => {
      setListData(filter);
    }, 1000);
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomSwipeListView
        listData={listData}
        onDelete={(data) => {
          
        
           Alert.alert(
            '',
            'Are you sure you want to delete Work Experience?',  
            [
               {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
               {text: 'OK', onPress: () => 
              { onDelete(data.item);
               console.log(data.item.id)
               lazyLoaderToggle
               ApiSauce.delete(API_DELETE_INDIVISUAL_WORKEXPER +"/"+data.item.id)
                .then((res) => {
                  lazyLoaderOff
                   console.log(res);
                  const successmsg = res.message;
                  showToast("", `${successmsg}`, "");
                
               })
                .catch((err) => {
                  lazyLoaderOff
                  console.log("error basic information", { err });
                  const msg = JSON.stringify(err.message);
                  showToast("Error", `${msg}`, "error");
                });
              }

              },
            ],
            { cancelable: false }
       )
        }}
        onEdit={(data) => {
          const { item } = data;
          navigation.navigate("AddworkExperince", { ...item, slug: slug });
        }}
        renderListItem={(item) => {
          return <RenderworkExperience item={item} />;
        }}
      ></CustomSwipeListView>
    </View>
  );
}


