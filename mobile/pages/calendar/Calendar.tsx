import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { generateUUID } from '../../common/helper/uuid';

const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();

type Day = {
  id: string;
  date: number | null;
}

const generateDay = (date: number | null) => ({
  id: generateUUID(),
  date,
});

function Calendar() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysArray: Day[] = [];

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
  for (let i = 0; i < monthStartDay; i += 1) {
    daysArray.push(generateDay(null));
  }

  // Add days of the month to the array
  for (let i = 1; i <= numDaysInMonth; i += 1) {
    daysArray.push(generateDay(i));
  }

  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={
            () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
          }
        >
          <Text>{'<'}</Text>
        </TouchableOpacity>
        <Text>{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>
        <TouchableOpacity
          onPress={
            () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
          }
        >
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
        {daysArray.map((day) => (
          <TouchableOpacity
            key={day.id}
            style={{
              width: '14.28%', height: 50, justifyContent: 'center', alignItems: 'center',
            }}
            onPress={() => setSelectedDate(day.date)}
          >
            {day.date ? (
              <Text style={{ color: selectedDate === day.date ? 'blue' : 'black' }}>{day.date}</Text>
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
