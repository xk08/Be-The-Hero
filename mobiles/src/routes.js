import React from 'react' ; 
import { createStackNavigator } from '@react-navigation/stack' ; 
import { NavigationContainer } from '@react-navigation/native' ; 

const AppStack = createStackNavigator() ; //primeira navegação

import Incidents from './pages/Incidents' ; 
import Detail from './pages/Detail' ; 

export default function Routes () {
    return (
        //Ficam em volta das rotas
        <NavigationContainer> 
            
            <AppStack.Navigator screenOptions={{ headerShown:false}}>

                <AppStack.Screen name='Incidents' component={Incidents}/>
                <AppStack.Screen name='Datail' component={Detail}/>

            </AppStack.Navigator>

        </NavigationContainer>

    ) ; 
}