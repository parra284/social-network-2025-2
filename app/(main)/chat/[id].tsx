import { supabase } from '@/utils/supabase';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function Chat() {
    const { id } = useLocalSearchParams();

    useEffect(() => {
        const channel = supabase
            .channel(id as string) 
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'messages' },
                (payload) => {
                    console.log('Change received!', payload);
                }).subscribe((status, error) => console.log({
                    status, error
                }));
        return () => {
            supabase.removeChannel(channel);
        }
    })

    return (
        <View>
            <Text>chat</Text>
        </View>
    )
}