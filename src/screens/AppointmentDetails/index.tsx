import React, { useState, useEffect } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { Fontisto } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

import { 
    ImageBackground, 
    View, 
    Text, 
    FlatList, 
    Alert, 
    Share,
    Platform
} from 'react-native';

import { AppointmentProps } from '../../components/Appointment';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { Load } from '../../components/Load';

import { theme } from '../../global/styles/theme';
import { api } from '../../services/api';
import { styles } from './styles';

import BannerImg from '../../assets/banner.png'

type Params = {
    guildSeleted: AppointmentProps;
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
}

export function AppointmentDetails() {
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoading] = useState(true);

    const route = useRoute();
    const invite = widget.instant_invite;
    const { guildSeleted } = route.params as Params;

    async function fetchGuildWidget() {
        try {
            const response = await api.get(`/guilds/${guildSeleted.guild.id}/widget.json`);
            setWidget(response.data);

        } catch (error) {
            Alert.alert('Verifique as configurações do servidror. Será que o widget está habilitado?');
        } finally {
            setLoading(false);
        }
    }

    function handleShareInvite() {
        const message = Platform.OS === 'ios'
            ? `Junte-se a ${guildSeleted.guild.name}`
            : invite;

        Share.share({
            message,
            url: invite,
        });
    }

    function handleOpenGuild() {
        invite
        ? Linking.openURL(invite)
        : Alert.alert('Link de convite inválido', 'Por favor, tente convidar mais tarde!');
    }

    useEffect(() => {
        fetchGuildWidget();
    }, []);

    return (
        <Background>
            <Header 
                title="Detalhes"
                action={
                    guildSeleted.guild.owner &&
                    <BorderlessButton onPress={handleShareInvite}>
                        <Fontisto 
                            name="share"
                            size={22}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />

            <ImageBackground 
                source={BannerImg}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        { guildSeleted.guild.name }
                    </Text>

                    <Text style={styles.subtitle}>
                        { guildSeleted.description }
                    </Text>
                </View>
            </ImageBackground>

            {
                loading
                ? <Load />
                : <> 
                    <ListHeader 
                        title="Jogadores"
                        subtitle={`Total ${widget.members.length}`}
                    />

                    <FlatList 
                        data={widget.members}
                        keyExtractor={item => item.id }
                        renderItem={({ item }) => (
                            <Member data={item} />
                        )}
                        ItemSeparatorComponent={() => <ListDivider isCentered />}
                        style={styles.members}
                    />
                </>
            }

            {
                guildSeleted.guild.owner &&
                <View style={styles.footer}>
                    <ButtonIcon 
                        title="Entrar na partida"
                        onPress={handleOpenGuild}
                    />
                </View>
            }
        </Background>
    );
}
