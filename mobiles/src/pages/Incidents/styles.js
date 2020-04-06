import {  StyleSheet } from 'react-native' ; 
import Constants from 'expo-constants' ; 

export default StyleSheet.create ({
    container: {
        flex: 1, //Ocupada todo o espaço da tela
        paddingHorizontal: 24, //Deixa espaço nas laterais
        paddingTop: Constants.statusBarHeight + 20, //Pega o tamamno da barra decima e poem mais um espaço em baixo
  
    },

    header: {
        flexDirection: 'row', //por padrão é em coluna, mas aqui ta sendo alterdo pra ficar ao lado
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerText: {
        fontSize: 15,
        color: '#737380',
    },

    headerTextBold: {
        fontWeight: 'bold'
    },

    title: {
        fontSize: 30 ,
        marginBottom: 16 ,
        marginTop: 48 ,
        color: '#13131a',
        fontWeight: 'bold'
    },

    description: {
        fontSize: 16,
        lineHeight: 24, //Espaço entre as linhas
        color: '#737380',
    },

    incidentList : {
        marginTop: 25,
    },

    incident : {
        padding: 24, //espaço em todos os lados iguais
        borderRadius: 10 , //arredondamento da borda
        backgroundColor: '#FFF',
        marginBottom: 16, //espaço entre os componentes
    },

    incidentProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
    },

    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
    },

    detailsButton: {
        flexDirection: 'row', //Pra ficar no formato linha e ficar ao lado do texto
        justifyContent: "space-between", //Faz ele ficar bem no canto
        alignItems: 'center'
    },

    detailsButtonText: {
        color: '#e02041',
        fontSize: 15,
        fontWeight: 'bold'
    }

}) ; 