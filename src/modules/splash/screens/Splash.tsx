import { useEffect } from "react";
import { ContainerSplash, ImageLogoSplash } from "../styles/splash.style";

const Splash = () => {
    useEffect(() => {
        const verifyLogin = async () => {

        }
        verifyLogin();
    }, []);

    return (
        <ContainerSplash>
            <ImageLogoSplash resizeMode="contain" source={require('../../../assets/images/logo.png')}/>
        </ContainerSplash>
    )
}

export default Splash;