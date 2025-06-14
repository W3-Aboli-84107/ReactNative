import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function VisitorFormScreen({ navigation }) {
  const [gender, setGender] = useState('');
  const [purpose, setPurpose] = useState('');
  const [reference, setReference] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Visitor’s Detail</Text>

      {/* Visitor Name */}
      <View style={styles.inputBox}>
        <Ionicons name="person" size={20} color="#E74C3C" style={styles.icon} />
        <TextInput placeholder="Visitor Name" placeholderTextColor="#aaa" style={styles.input} />
      </View>

      {/* Phone Number */}
      <View style={styles.inputBox}>
        <Ionicons name="call" size={20} color="#E74C3C" style={styles.icon} />
        <TextInput placeholder="Phone number" placeholderTextColor="#aaa" style={styles.input} keyboardType="phone-pad" />
      </View>

      {/* Email */}
      <View style={styles.inputBox}>
        <MaterialCommunityIcons name="email-outline" size={20} color="#E74C3C" style={styles.icon} />
        <TextInput placeholder="Email" placeholderTextColor="#aaa" style={styles.input} keyboardType="email-address" />
      </View>

      {/* Address */}
      <View style={styles.inputBox}>
        <Ionicons name="location-outline" size={20} color="#E74C3C" style={styles.icon} />
        <TextInput placeholder="Address" placeholderTextColor="#aaa" style={styles.input} />
      </View>

      {/* Gender Picker */}
      <View style={styles.pickerBox}>
        <Ionicons name="male-female" size={20} color="#E74C3C" style={styles.icon} />
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {/* Purpose Picker */}
      <View style={styles.pickerBox}>
        <Ionicons name="calendar" size={20} color="#E74C3C" style={styles.icon} />
        <Picker
          selectedValue={purpose}
          onValueChange={(itemValue) => setPurpose(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Purpose" value="" />
          <Picker.Item label="Meeting" value="Meeting" />
          <Picker.Item label="Delivery" value="Delivery" />
          <Picker.Item label="Interview" value="Interview" />
        </Picker>
      </View>

      {/* Description */}
      <View style={styles.textAreaBox}>
        <Ionicons name="document-text-outline" size={20} color="#E74C3C" style={styles.icon} />
        <TextInput
          placeholder="Description"
          placeholderTextColor="#aaa"
          style={styles.textArea}
          multiline
        />
      </View>

      {/* Whom to meet */}
      <View style={styles.inputBox}>
        <FontAwesome name="users" size={20} color="#E74C3C" style={styles.icon} />
        <TextInput placeholder="Whom to meet" placeholderTextColor="#aaa" style={styles.input} />
      </View>

      {/* ID Proof */}
      <View style={styles.inputBox}>
        <MaterialCommunityIcons name="card-account-details-outline" size={20} color="#E74C3C" style={styles.icon} />
        <TextInput placeholder="ID proof (optional)" placeholderTextColor="#aaa" style={styles.input} />
      </View>

      {/* Reference By */}
      <View style={styles.pickerBox}>
        <MaterialCommunityIcons name="account-search-outline" size={20} color="#E74C3C" style={styles.icon} />
        <Picker
          selectedValue={reference}
          onValueChange={(itemValue) => setReference(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Reference by (optional)" value="" />
          <Picker.Item label="Manager" value="Manager" />
          <Picker.Item label="HR" value="HR" />
          <Picker.Item label="Employee" value="Employee" />
        </Picker>
      </View>

      {/* Photo + Remark (you can add actual image picker later) */}
      <View style={styles.rowButtons}>
        <TouchableOpacity style={styles.buttonOutline}>
          <Ionicons name="camera" size={20} color="#fff" />
          <Text style={styles.buttonText}>Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonOutline}>
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Remark (optional)</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.actionText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D1A',
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputBox: {
    flexDirection: 'row',
    backgroundColor: '#1E1E2C',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    color: '#fff',
    marginLeft: 10,
    flex: 1,
  },
  icon: {
    marginLeft: 4,
  },
  pickerBox: {
    flexDirection: 'row',
    backgroundColor: '#1E1E2C',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    color: '#fff',
  },
  textAreaBox: {
    flexDirection: 'row',
    backgroundColor: '#1E1E2C',
    borderRadius: 8,
    padding: 10,
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  textArea: {
    color: '#fff',
    marginLeft: 10,
    flex: 1,
    height: 80,
    textAlignVertical: 'top',
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonOutline: {
    flexDirection: 'row',
    backgroundColor: '#1E1E2C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  cancelButton: {
    backgroundColor: '#1E1E2C',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
