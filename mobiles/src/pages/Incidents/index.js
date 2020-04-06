import React, { useState, useEffect } from 'react' ; 
import { Feather } from '@expo/vector-icons' ; 
import { useNavigation } from '@react-navigation/native' ; 
import { View, Image, Text, TouchableOpacity, FlatList, AsyncStorage } from 'react-native' ; 

import logoImg from '../../assets/logo.png' ; 
import styles from './styles' ; 
import api from '../../services/api' ; 

export default function Incidetns () {

    //Criando as variaveis de estado
    const [incidents, setIncidents] = useState([]) ; // começa vazia por ser um array
    const [total, setTotal] = useState(0) ;

    const [page, setPage] = useState(1) ; 
    const [loading, setLoading] = useState(false) ; 

    const navigation = useNavigation() ; 

    //Função que troca de pagina e já enviar o ID da pagina
    function navigateToDetail(incident) {
        navigation.navigate('Datail', {incident}) ; 
    }

    // Responsável por chamar e gerenciar a listagem e busc do incidents
    async function loadIncidents () {

        if (loading) {
            return ; 

        }

        if (total < 0 && incidents.length == total) {
            return ;
        }

        setLoading(true) ; 


        const response = await api.get('incidents', {
            params: {page}
        }); //Fazendo a requisição pro back atraves do axios

        setIncidents([ ...incidents, ...response.data]) ;// Anexando 2 vetores, dentro do array (???)
        setTotal(response.headers['x-total-count']) ;//'gravando' os dados no estado da variavel vetor
        setPage(page + 1) ; 
        setLoading(false) ; 
    }

    //Função que dispara quando as variaveis tiverem alteração no seu estado
    useEffect(() => {
        loadIncidents() ;
    }, 
        []

    ); 

    return (

        /**
         * Aqui no react-native, tudo que seria DIV vai ser usado "View"
         * e o que seria padrões de texto (h1, p, strong, etc) vai ser usado "Text" 
         * só que ai , será passado stilos proprios pra cada componente
         */
        
        <View style={styles.container}>
        
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style = {styles.title}>Bem Vindo!</Text>
            <Text style = {styles.description}>
                Escolha um dos casos abaixo e salve o dia.
            </Text>

            {/**Aqui é o componente responsável por listar, criar o ScrollVeiew em si  */}
            <FlatList 
                style = {styles.incidentList}
                data = {incidents} //passa os dados em si que ta querendo listar
                keyExtractor = {incident => String(incident.id)}
                showsVerticalScrollIndicator={false} //Tira o efeito do scroll da lateral da tela
                onEndReached = {loadIncidents}
                onEndReachedThreshold= {0.2}
                renderItem = { ({item: incident}) => ( // por padrão o nome é 'item' mas pra n causar problemas mentais, foi alterado para 'incident' pra ficar em um padrão

                    <View style = {styles.incident}>
                    <Text style = {styles.incidentProperty}>ONG</Text>
                    <Text style = {styles.incidentValue}>{incident.name}</Text>

                    <Text style = {styles.incidentProperty}>CASO</Text>
                    <Text style = {styles.incidentValue}>{incident.title}</Text>

                    <Text style = {styles.incidentProperty}>VALOR</Text>
                    <Text style = {styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'}).format(incident.value)
                    }</Text>

                    <TouchableOpacity
                    style = {styles.detailsButton}
                    onPress = {() => navigateToDetail(incident) }
                    >
                    <Text style = {styles.detailsButtonText}>Ver mais informações</Text>
                    <Feather name = "arrow-right" size = {20} color = "#E02041" />
                    </TouchableOpacity>
                </View>
                ) }
            />
        </View>
    ) ;  
}