import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, FlatList } from 'react-native';

import { Appointment, AppointmentProps } from '../../components/Appointment';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Profile } from '../../components/Profile';
import { Load } from '../../components/Load';

import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { styles } from './styles';

export function Home() {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

  const navigation = useNavigation();

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSeleted: AppointmentProps) {
  navigation.navigate('AppointmentDetails', { guildSeleted });
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

  async function loadAppointments() {
    const  response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

    if (category) {
      setAppointments(storage.filter(item => item.category === category));
    } else {
      setAppointments(storage);
    };

    setLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadAppointments();
  }, [category]));

  return (
    <Background>
        <View style={styles.header}>
            <Profile />
            <ButtonAdd  onPress={handleAppointmentCreate} />
        </View>

        <CategorySelect
          categorySelected={category}
          setCategory={handleCategorySelect}
        />

        {
          loading
          ? <Load />
          : <>
            <ListHeader 
              title="Partidas Agendadas"
              subtitle={`Total ${appointments.length}`}
            />

            <FlatList 
              data={appointments}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Appointment 
                  data={item}
                  onPress={() => handleAppointmentDetails(item)}
                />
              )}
              style={styles.matches}
              contentContainerStyle={{ paddingBottom: 64 }}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <ListDivider />}
            />
          </>
        }
    </Background>
  );
}