import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, Alert, ScrollView, TouchableHighlight } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

export default function App() {

  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(false);
  const [averagePoint, setAveragePoint] = useState(0);

  const updatePoint = (pt, idx) => {
    const updatedArr = [...subjects];
    updatedArr[idx].point = pt;
    setSubjects(updatedArr);
  }

  const updateCredit = (credit, idx) => {
    const updatedArr = [...subjects];
    updatedArr[idx].credit = credit;
    setSubjects(updatedArr);
  }

  const onSelection = (len) => {
    let arr = [];

    for (let i = 0; i < len; i++) {
      let currentObject = subjects[i];
      arr.push(
        currentObject ||
        {
          point: null,
          credit: null
        }
      )
    }


    setSubjects(arr)
  }


  const calculateAvg = () => {
    // setError(false);
    let isError = false;
    let prodsum = 0;
    let creditSum = 0;
    subjects.map((el) => {
      if (!el.credit?.trim() || !el.point?.trim() || isNaN(el.point) || isNaN(el.credit)) {
        isError = true;
      }
      prodsum += Number(el.credit) * Number(el.point);
      creditSum += Number(el.credit)
    });

    setError(isError);
    if (isError) return Alert.alert('Boş xanaları doldurun!');
    let avg = (prodsum / creditSum).toFixed(5);
    setAveragePoint(avg)
  }


  const subjectNumber = [3, 4, 5, 6, 7, 8]

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" backgroundColor='#04364A' />
      <ScrollView className="h-full">
        <View className="w-full py-6  bg-[#04364A] flex flex-row items-center justify-center rounded-b-3xl">
          <Text style={styles.text}>Ortalamanı hesabla</Text>
        </View>

        <View style={styles.container}>

          <View className="flex justify-center flex-row my-4">
            <SelectDropdown
              defaultButtonText='Fənn sayını seç'
              data={subjectNumber}
              rowTextForSelection={(item) => {
                return item;
              }}

              buttonTextAfterSelection={(item) => {
                return `${item} fənn`;
              }}

              onSelect={(item) => onSelection(item)}
            />
          </View>



          {
            subjects.length > 0 &&
            <>
              <Text className="text-center my-6 text-2xl font-semibold text-white">
                ÜOMG: {averagePoint}
              </Text>
              <View className="flex flex-row justify-center items-center mb-2">
                <Text className="w-[50%] text-center font-semibold text-xl text-[#DAFFFB]">
                  Ballar
                </Text>
                <Text className="w-[50%] text-center font-semibold text-xl text-[#DAFFFB]">
                  Kreditlər
                </Text>
              </View>
            </>
          }

          {
            subjects.length > 0 &&
            subjects.map((sub, idx) => (
              <View key={idx} className="flex flex-row justify-between mb-4 px-4">
                <TextInput
                  selectionColor={'black'}
                  keyboardType='decimal-pad'
                  maxLength={3}
                  className='bg-white text-black p-2 rounded-md w-[48%]'
                  placeholder='Bal'
                  onChangeText={(e) => {
                    updatePoint(e, idx)
                  }}
                />
                <TextInput
                  selectionColor={'black'}
                  keyboardType='decimal-pad'
                  className='bg-white text-black p-2 rounded-md w-[48%]'
                  placeholder='Kredit'
                  maxLength={1}
                  onChangeText={(e) => updateCredit(e, idx)}
                />
              </View>
            ))
          }

          {
            subjects.length > 0 &&
            <View className="flex flex-row justify-center w-full">
              <TouchableHighlight style={styles.btnStyle} onPress={calculateAvg}>
                <Text className="text-white font-semibold text-xl">
                  Hesabla
                </Text>
              </TouchableHighlight>
            </View>
          }
        </View>
      </ScrollView>

    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#176B87'
  },
  container: {
    backgroundColor: '#176B87',
    padding: 15,
    height: '100%'
  },
  button: {
    width: '100%',
    height: '40px',
  },
  text: {
    color: '#fff',
    fontSize: 25,

    textAlign: 'center'
  },
  btnStyle: {
    width: '50%',
    height: 60,
    backgroundColor: '#04364A',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  }

});
