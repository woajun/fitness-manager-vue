import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Record } from './Definitions';

type ShowRecordsProps = {
 records : Record[]
}

type MergedRecord = {
  id: number,
  name: string,
  set: number,
  rep: number,
  ms: number,
}

export default function ShowRecords({ records }: ShowRecordsProps) {
  const mergedRecord: MergedRecord[] = [];

  for (let i = 0; i < records.length; i += 1) {
    const e = records[i];
    if (mergedRecord.length > 0
       && mergedRecord[mergedRecord.length - 1].name === e.exrName) {
      const last = mergedRecord[mergedRecord.length - 1];
      last.set += 1;
      last.rep += e.rep;
      last.ms += e.ms;
    } else {
      mergedRecord.push({
        id: e.at.getTime(),
        name: e.exrName,
        set: 1,
        ms: e.ms,
        rep: e.rep,
      });
    }
  }

  return (
    <ScrollView>
      {
          mergedRecord.map((mr) => (
            <View key={mr.id}>
              <Text>
                {mr.name}
                {mr.set}
                set/
                {mr.rep}
                rep/
                {mr.ms / 1000}
                sec
              </Text>
            </View>
          ))
        }
    </ScrollView>
  );
}
