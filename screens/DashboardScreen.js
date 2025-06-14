import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DashboardScreen({ navigation }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [visitors, setVisitors] = useState([]); // 👈 empty initially
  const [newVisitor, setNewVisitor] = useState(''); // 👈 input state

  const handleCalendarPress = () => setShowCalendar(true);

  const onDateChange = (event, date) => {
    setShowCalendar(Platform.OS === 'ios');
    if (date) setSelectedDate(date);
  };

  const handleLogout = () => navigation.replace('Login');

  const addVisitor = () => {
    if (!newVisitor.trim()) {
      Alert.alert('Error', 'Please enter a visitor name.');
      return;
    }
    const newEntry = {
      id: Date.now().toString(),
      name: newVisitor.trim(),
    };
    setVisitors([newEntry, ...visitors]);
    setNewVisitor('');
  };

  const renderVisitor = ({ item }) => (
    <View style={styles.visitorCard}>
      <Text style={styles.visitorName}>{item.name}</Text>
      <View style={styles.visitorIcons}>
        <Ionicons name="eye-outline" size={20} color="white" style={styles.visitorIcon} />
        <Ionicons name="call-outline" size={20} color="white" style={styles.visitorIcon} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hello, <Text style={styles.bold}>Suraj</Text>
        </Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={handleCalendarPress} style={styles.iconWrapper}>
            <Ionicons name="calendar-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.iconWrapper}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {showCalendar && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {/* Add Visitor Input */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Enter visitor name"
          placeholderTextColor="#aaa"
          style={styles.searchInput}
          value={newVisitor}
          onChangeText={setNewVisitor}
        />
        <TouchableOpacity onPress={addVisitor} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Visitor List */}
      <View style={styles.visitorListContainer}>
        <Text style={styles.sectionTitle}>Today's Visitors</Text>
        <FlatList
          data={visitors}
          keyExtractor={(item) => item.id}
          renderItem={renderVisitor}
          ListEmptyComponent={<Text style={{ color: '#ccc' }}>No visitors yet.</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E2C', paddingTop: 50 },
  header: {
    backgroundColor: '#C0392B',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: { color: '#fff', fontSize: 20 },
  bold: { fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  iconWrapper: { marginLeft: 16, padding: 6 },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    backgroundColor: '#2C2C3A',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#F46D5D',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  visitorListContainer: {
    flex: 1,
    backgroundColor: '#2C2C3A',
    marginHorizontal: 12,
    borderRadius: 10,
    padding: 16,
    marginTop: 10,
  },
  sectionTitle: { color: '#fff', fontSize: 16, marginBottom: 12 },
  visitorCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#3A3A4A',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  visitorName: { color: '#fff', fontSize: 16 },
  visitorIcons: { flexDirection: 'row' },
  visitorIcon: {
    marginLeft: 12,
    backgroundColor: '#4CAF50',
    padding: 6,
    borderRadius: 20,
  },
});
