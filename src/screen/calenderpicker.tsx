import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const DateRangeSelector = () => {
  const [selectedStartDate, setSelectedStartDate] = useState([]);
  const [selectedEndDate, setSelectedEndDate] = useState([]);
  const minDate = new Date(); // Today
  const maxDate = new Date(2025, 6, 3);
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toString() : '';

  const onDateChange = (date: any, type: any) => {
    console.log(date);
    if (type === 'END_DATE') {
      setSelectedEndDate(date.toString().slice(0, 11));
    } else {
      setSelectedStartDate(date.toString().slice(0, 11)),
        setSelectedEndDate([]);
    }
  };

  return (
    <View style={styles.container}>
      <CalendarPicker
        startFromMonday={true}
        allowRangeSelection={true}
        minDate={minDate}
        maxDate={maxDate}
        todayBackgroundColor="#f2e6ff"
        selectedDayColor="#7300e6"
        selectedDayTextColor="#FFFFFF"
        onDateChange={onDateChange}
      />
      <View>
        <Text>SELECTED START DATE:{startDate}</Text>
        <Text>SELECTED END DATE:{endDate}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 100,
  },
});
export default DateRangeSelector;
