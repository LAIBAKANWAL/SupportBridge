import {  View ,Alert} from "react-native";
import React, { useState, useEffect } from "react";
import RenderPublications from "./renderPublications";
import { useNavigation } from "@react-navigation/native";
import CustomSwipeListView from "../../../../../compounds/CustomSwipeListView";
import { API_DELETE_INDIVISUAL_PUBLICATION} from "../../../../../../config/WebService";
import ApiSauce from "../../../../../../services/ApiSauce";


export default function Publications({ data, slug }) {
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
            'Are you sure you want to delete Education Background?',  
            [
               {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
               {text: 'OK', onPress: () => 
              { onDelete(data.item);
               console.log(data.item.id)
               
               ApiSauce.delete(API_DELETE_INDIVISUAL_PUBLICATION +"/"+data.item.id)
                .then((res) => {
                   console.log(res);
                  const successmsg = res.message;
                  showToast("", `${successmsg}`, "");
                
               })
                .catch((err) => {
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
          navigation.navigate("AddPublications", { ...item, slug: slug });
        }}
        renderListItem={(item) => {
          return <RenderPublications item={item} />;
        }}
      ></CustomSwipeListView>
    </View>
  );
}


