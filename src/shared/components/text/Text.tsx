import { TextProps as TextPropsNative } from "react-native/types";
import { ContainerText } from "./text.style";
import { textTypes } from "./textTypes";
import { useMemo } from "react";

interface TextProps extends TextPropsNative {
    color ?: string;
    type ?: string;
    margin ?: string;
}

const Text = ({margin, color, type, ...props}: TextProps) => {
    const fontSize = useMemo(() => {
        switch (type) {
            case textTypes.TITLE_BOLD:
            case textTypes.TITLE_SEMI_BOLD:
            case textTypes.TITLE_REGULAR:
            case textTypes.TITLE_LIGHT:
                return '24px';
            case textTypes.SUBTITLE_BOLD:
            case textTypes.SUBTITLE_SEMI_BOLD:
            case textTypes.SUBTITLE_REGULAR:
            case textTypes.SUBTITLE_LIGHT:
                return '20px';
            case textTypes.BUTTON_BOLD:
            case textTypes.BUTTON_SEMI_BOLD:
            case textTypes.BUTTON_REGULAR:
            case textTypes.BUTTON_LIGHT:
                return '18px';
            case textTypes.PARAGRAPH_SMALL_BOLD:
            case textTypes.PARAGRAPH_SMALL_SEMI_BOLD:
            case textTypes.PARAGRAPH_SMALL_REGULAR:
            case textTypes.PARAGRAPH_SMALL_LIGHT:
                return '10px';
            case textTypes.PARAGRAPH_BOLD:
            case textTypes.PARAGRAPH_SEMI_BOLD:
            case textTypes.PARAGRAPH_REGULAR:
            case textTypes.PARAGRAPH_LIGHT:
            default:
                return '14px';
        }
    }, [type]);

    const fontFamily = useMemo(() => {
        switch (type) {
            case textTypes.TITLE_BOLD:
            case textTypes.SUBTITLE_BOLD:
            case textTypes.BUTTON_BOLD:
            case textTypes.PARAGRAPH_BOLD:
            case textTypes.PARAGRAPH_SMALL_BOLD:
                return 'Poppins-Bold';
            case textTypes.TITLE_SEMI_BOLD:
            case textTypes.SUBTITLE_SEMI_BOLD:
            case textTypes.BUTTON_SEMI_BOLD:
            case textTypes.PARAGRAPH_SEMI_BOLD:
            case textTypes.PARAGRAPH_SMALL_SEMI_BOLD:
                return 'Poppins-SemiBold';
            case textTypes.TITLE_LIGHT:
            case textTypes.SUBTITLE_LIGHT:
            case textTypes.BUTTON_LIGHT:
            case textTypes.PARAGRAPH_LIGHT:
            case textTypes.PARAGRAPH_SMALL_LIGHT:
                return 'Poppins-Light';
            case textTypes.TITLE_REGULAR:
            case textTypes.SUBTITLE_REGULAR:
            case textTypes.BUTTON_REGULAR:
            case textTypes.PARAGRAPH_REGULAR:
            case textTypes.PARAGRAPH_SMALL_REGULAR:
            default:
                return 'Poppins-Regular';
        }
    }, [type]);


    return (
        <ContainerText customMargin={margin} fontFamily={fontFamily} fontSize={fontSize} color={color} {...props}/>
    )
}

export default Text;