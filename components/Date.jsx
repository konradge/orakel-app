import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { addDay, generateNumber } from "../helpers";
import DatePicker from "./DatePicker";
import GeneratorLayout from "./GeneratorLayout";

const weekdays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

export default () => {
  const [dateBoundaries, setDateBoundaries] = useState({
    start: null,
    end: null,
  });
  const [generatedIndex, setGeneratedIndex] = useState(null);
  return (
    <GeneratorLayout
      selection={
        <DatePicker
          onDateChange={(start, end) => {
            setDateBoundaries({ start, end });
          }}
        />
      }
      generatorFunction={() => {
        return Math.floor(
          Math.random() *
            generateAllDates(dateBoundaries.start, dateBoundaries.end).length
        );
      }}
      generateButtonDisabled={
        dateBoundaries.start == null || dateBoundaries.end == null
      }
      outputComponents={generateAllDates(
        new Date(dateBoundaries.start),
        new Date(dateBoundaries.end)
      )
        .map((d) => new Date(d))
        .map((date) => {
          return {
            date: dateFormat(date, "dd.mm.yyyy"),
            weekday: weekdays[date.getDay()],
          };
        })
        .map((o) => (
          <View>
            <Text style={styles.weekdayText}>{o.weekday}</Text>
            <Text style={styles.dateText}>{o.date}</Text>
          </View>
        ))}
    />
  );
};

const generateAllDates = (start, end) => {
  console.log("Generating all days!", start, end);
  if (start == null || end == null) return [];
  const endDate = new Date(end);
  let allDates = [new Date(start).getTime()];
  console.log(allDates);
  while (allDates[allDates.length - 1] < endDate) {
    console.log(allDates);
    allDates.push(addDay(allDates[allDates.length - 1]));
  }
  return allDates;
};

const styles = StyleSheet.create({
  weekdayText: { fontSize: 70, alignSelf: "center" },
  dateText: { fontSize: 50 },
});
