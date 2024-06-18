import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from "./Home";
import Login from "./modules/login";
import { MenuURL } from "./shared/enums/MenuURL.enum";
import LoginScreen from "./Login";
import MedicationSearchScreen from "./BuscaMedicamento";
import AlarmListScreen from "./ListaAlarmes";
import AlarmCreateScreen from "./CadastraAlarme";
import SignupScreen from "./Cadastro";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen name={MenuURL.SPLASH} component={Splash} options={{ headerShown: false }}/> */}
                <Stack.Screen name={MenuURL.LOGIN} component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name={MenuURL.HOME} component={Home} options={{ title: 'Home' }} />
                <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ title: 'LoginScreen' }} />
                <Stack.Screen name='BuscaMedicamento' component={MedicationSearchScreen} options={{ title: 'BuscaMedicamento' }} />
                <Stack.Screen name="Alarmes" component={AlarmListScreen} options={{ title: 'Meus Alarmes' }} />
                <Stack.Screen name="CadastrarAlarme" component={AlarmCreateScreen} options={{ title: 'Cadastrar Alarme' }} />
                <Stack.Screen name="Cadastro" component={SignupScreen} options={{ title: 'Cadastro' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default  Navigation;