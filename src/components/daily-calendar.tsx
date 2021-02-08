import { IonCard, IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { GoalList } from '../goal';
import { achievementColor, formatDate, getDayProgress, ProgressList } from '../progress';

import '../theme/calendar.css';


const DailyCalendar: React.FC<{ currentMonth: Date, progressList: ProgressList, goalList: GoalList }> = props => {
    const startDate = new Date(props.currentMonth.getFullYear(), props.currentMonth.getMonth());

    let topLeftDate = startDate;

    while (topLeftDate.getDay() > 0) {
        topLeftDate.setDate(topLeftDate.getDate() - 1);
    }

    return (

        <IonGrid>
            <IonRow>
                <IonCol className="ion-text-center">SUN</IonCol>
                <IonCol className="ion-text-center">MON</IonCol>
                <IonCol className="ion-text-center">TUE</IonCol>
                <IonCol className="ion-text-center">WED</IonCol>
                <IonCol className="ion-text-center">THU</IonCol>
                <IonCol className="ion-text-center">FRI</IonCol>
                <IonCol className="ion-text-center">SAT</IonCol>
            </IonRow>

            {Array.from(Array(6).keys()).map((week) => (
                <IonRow key={week}>
                    {
                        Array.from(Array(7).keys()).map((day) => {
                            const date = new Date(topLeftDate);
                            date.setDate(date.getDate() + week * 7 + day);

                            return (<IonCol key={date.getTime()}><IonCard color={achievementColor(getDayProgress(date, props.progressList, props.goalList))} className={
                                date.getMonth() == props.currentMonth.getMonth() ? 'calendar-card' : 'calendar-card different-month'}>
                                {date.getDate()}
                            </IonCard>
                            </IonCol>);
                        })
                    }
                </IonRow>
            ))}

        </IonGrid>
    );
};

export default DailyCalendar;