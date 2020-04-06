import React from 'react' ; 
import { Feather } from '@expo/vector-icons' ; 
import { useNavigation, useRoute} from '@react-navigation/native'
import { Text, Image, View, TouchableOpacity, Linking } from 'react-native' ; 
import * as MailComposer from 'expo-mail-composer' ; 

import logoImg from '../../assets/logo.png' ; 
import styles from './styles' ; 

export default function Detail () {
    const navigation = useNavigation () ;
    const route = useRoute() ; 

    const incident = route.params.incident; // porque foi o que foi enviado da pagina incident na função navigateToDetail
    const message = `Ola ${incident.name}, estou entrando em contato, pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(incident.value)}` ;

    //Enviar email direto do app
    function sendMail() {
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    //Enviar mensagem no whatsapp
    //Utiliza DEEP-LINKING 
    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }
    
    //Função para voltar na seta
    function navigateBack () {
        navigation.goBack() // Função padrão de voltar uma pagina ou ação 
    }


    return (
        <View style = {styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>

                <TouchableOpacity onPress = {navigateBack}>
                    <Feather name = "arrow-left" size = {28} color = "#E82041"/>
                </TouchableOpacity>
            </View>

            <View style = {styles.incident}>

                <Text style = {[styles.incidentProperty , {marginTop: 0}]}>ONG</Text>
                <Text style = {styles.incidentValue}>{incident.name} de {incident.city} / {incident.uf}</Text>

                 <Text style = {styles.incidentProperty}>CASO</Text>
                 <Text style = {styles.incidentValue}>{incident.title}</Text>

                 <Text style = {styles.incidentProperty}>VALOR</Text>
                 <Text style = {styles.incidentValue}>
                {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'}).format(incident.value)
                }</Text>
            </View>

            <View style = {styles.contactBox}>
                <Text style = {styles.heroTitle}>Salve o dia!</Text>
                <Text style = {styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style = {styles.heroDescription}>Entre em contato</Text>

            <View style = {styles.actions}>
                <TouchableOpacity style = {styles.action} onPress = {sendWhatsApp}>
                    <Text style = {styles.actionText}>WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.action} onPress = {sendMail}>
                    <Text style = {styles.actionText}>E-mail</Text>
                </TouchableOpacity>
            </View>

            </View>
        
        </View>
    ) ; 
} 
