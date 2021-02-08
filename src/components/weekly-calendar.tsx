import { IonCard, IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { GoalList } from '../goal';
import { achievementColor, formatDate, getWeekProgress, ProgressList } from '../progress';

import '../theme/calendar.css';


const WeeklyCalendar: React.FC<{ currentMonth: Date, progressList: ProgressList, goalList: GoalList }> = props => {
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
                            <IonCard color={achievementColor(getWeekProgress(dateStart, props.progressList, props.goalList))}
                            className='calendar-card'>{formatDate(dateStart)} to {formatDate(dateEnd)}</IonCard>
                        </IonCol>
                    </IonRow>
                );

            })}

        </IonGrid>
    );
};

export default WeeklyCalendar;