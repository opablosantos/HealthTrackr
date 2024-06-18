import {Alert, ModalProps as ModalPropsReact, Modal as ModalReact} from 'react-native';
import { ContainerModal, IconCloseModal } from './modal.style';
import Text from '../text/Text';
import { theme } from '../../themes/theme';
import { textTypes } from '../text/textTypes';
import Button from '../button/Button';

interface ModalProps extends ModalPropsReact {
    title: string;
    text: string;
    onCloseModal: () => void;
}

const Modal = ({ title, text, onCloseModal, ...props }: ModalProps) => {
    return (
        <ModalReact
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
        {...props}
        >
        <ContainerModal>
            <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.mainTheme.primary} margin="16px">{title}</Text>
            <Text>
                {text}
            </Text>
            <Button title='OK' onPress={onCloseModal}/>
            <IconCloseModal onPress={onCloseModal} name="cross"/>
        </ContainerModal>
      </ModalReact>
    );
}

export default Modal;