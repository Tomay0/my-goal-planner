import { IonCard, IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { formatDate } from '../progress';

import '../theme/calendar.css';


const WeeklyCalendar: React.FC<{ currentMonth: Date }> = props => {
    const startDate = new Date(props.currentMonth.getFullYear(), props.currentMonth.getMonth());

    let topLeftDate = startDate;

    while (topLeftDate.getDay() > 0) {
        topLeftDate.setDate(topLeftDate.getDate() - 1);
    }

    return (

        <IonGrid>
            {Array.from(Array(6).keys()).map((week) => {
                const dateStart = new Date(topLeftDate);
                dateStart.setDate(dateStart.getDate() + week * 7);

                const dateEnd = new Date(dateStart);
                dateEnd.setDate(dateEnd.getDate() + 6);

                return (
                    <IonRow key={dateStart.getTime()}>
                        <IonCol>
                            <IonCard className='calendar-card'>{formatDate(dateStart)} to {formatDate(dateEnd)}</IonCard>
                        </IonCol>
                    </IonRow>
                );

            })}

        </IonGrid>
    );
};

export default WeeklyCalendar;