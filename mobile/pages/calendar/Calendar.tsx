import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysArray = [];

  // Get the number of days in the current month
  const numDaysInMonth = daysInMonth(
    currentMonth.getMonth() + 1,
    currentMonth.getFullYear(),
  );

  // Get the day of the week the month starts on
  const monthStartDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  ).getDay();

  // Add empty days to the start of the array to align weekdays
  for (let i = 0; i < monthStartDay; i++) {
    daysArray.push(null);
  }

  // Add days of the month to the array
  for (let i = 1; i <= numDaysInMonth; i++) {
    daysArray.push(i);
  }

  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
          <Text>{'<'}</Text>
        </TouchableOpacity>
        <Text>{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>
        <TouchableOpacity onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
          <Text>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <Text style={{ width: '14.28%' }}>Sun</Text>
        <Text style={{ width: '14.28%' }}>Mon</Text>
        <Text style={{ width: '14.28%' }}>Tue</Text>
        <Text style={{ width: '14.28%' }}>Wed</Text>
        <Text style={{ width: '14.28%' }}>Thu</Text>
        <Text style={{ width: '14.28%' }}>Fri</Text>
        <Text style={{ width: '14.28%' }}>Sat</Text>
        {daysArray.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: '14.28%', height: 50, justifyContent: 'center', alignItems: 'center',
            }}
            onPress={() => setSelectedDate(day)}
          >
            {day ? (
              <Text style={{ color: selectedDate === day ? 'blue' : 'black' }}>{day}</Text>
            ) : (
              <Text>&nbsp;</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default Calendar;
