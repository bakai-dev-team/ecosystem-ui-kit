import React from 'react';
import {TIconType, ICON_TYPES} from './types';

export interface IconProps {
    type: TIconType;
    width?: string | number;
    height?: string | number;
    className?: string;
    onClick?: (e: React.MouseEvent<SVGElement>) => void;
    style?: React.CSSProperties;
}

export const Icon: React.FC<IconProps> =
    ({
         type,
         className,
         width = 24,        
         height = 24,
         onClick,
         style
     }) => {
        return (
            <svg
                className={className}
                width={width}
                height={height}
                style={style}
                onClick={onClick}
                role={onClick ? "button" : "img"}
                tabIndex={onClick ? 0 : undefined}
            >
                <use href={`#${ICON_TYPES[type]}`}/>
            </svg>
        );
    };