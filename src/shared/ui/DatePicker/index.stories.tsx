import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker} from "./index";
import { IonApp, IonContent } from "@ionic/react";
import { IconProvider } from "../../assets/icons/IconProvider.tsx";

const meta: Meta<typeof DatePicker> = {
    title: "UI/DatePicker",
    component: DatePicker,
    tags: ["autodocs"],
    parameters: {
       docs:{
           description:{
               component:"Component DatePicker"
           }
       }
    },

    decorators: [
        (Story) => (
            <IonApp>
                <IconProvider />
                <IonContent>
                    <Story />
                </IonContent>
            </IonApp>
        ),
    ],

    argTypes: {
        className: {
            control: "text",
            description: "CSS классы",
        },
        onDateRangeChange: {
            description: "Срабатывает, когда выбран новый диапазон",
            table: {
                type: {
                    summary: "(range: {startDate: Date | null, endDate: Date | null}) => void",
                },
            },
        },
    },
};

export default meta;

export const Default: StoryObj = {
    render: () => {
        const [, setRange] = useState({
            startDate: null as Date | null,
            endDate: null as Date | null,
        });

        return (
            <DatePicker
                onDateRangeChange={(value) => setRange(value)}
            />
        );
    },
};
