import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native"

interface ExampleProps {
    text?: string;
    children?: string;
}

const Example = ({children, text}: ExampleProps) => {
    const [newText, setNewText] = useState();

    useEffect(() => {
        console.log('passou aqui');
    }, [newText]);

    const handleOnPress = () => {
        // setNewText('NOVO TEXTO');
    }
    
    return (
        <View>
            <Text style={{color: 'pink'}}>
                {children}
            </Text>
            <Text style={{color: 'blue'}}>
                {newText || text}
            </Text>
            <Button onPress={handleOnPress} title="BOTAO"/>
        </View>
    )
}

export default Example;