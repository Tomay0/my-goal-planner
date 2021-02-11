import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonLabel, IonList, IonListHeader, IonPopover, IonProgressBar, IonRow } from '@ionic/react';
import React, { useState } from 'react';
import { GoalList } from '../goal';
import { formatDate, getColorOverall, getColorSingle, getDayTaskProgress, ProgressList, TaskProgress } from '../progress';

import '../theme/calendar.css';


const DailyCalendar: React.FC<{ currentMonth: Date, progressList: ProgressList, goalList: GoalList }> = props => {
    const startDate = new Date(props.currentMonth.getFullYear(), props.currentMonth.getMonth());
    const [popoverState, setPopoverState] = useState<{
        showPopover: boolean, event: any,
        progress: Array<TaskProgress> | undefined, date: Date | undefined
    }>
        ({ showPopover: false, event: undefined, progress: undefined, date: undefined });

    let topLeftDate = startDate;

    while (topLeftDate.getDay() > 0) {
        topLeftDate.setDate(topLeftDate.getDate() - 1);
    }

    // TODO https://ionicframework.com/docs/api/popover
    return (
        <>
            <IonPopover
                cssClass='what'
                event={popoverState.event}
                isOpen={popoverState.showPopover}
                onDidDismiss={() => setPopoverState({ showPopover: false, event: undefined, progress: undefined, date: undefined })}>
                <IonContent>
                    {
                        popoverState.progress?.length == 0 && "No tasks are assigned for this day."
                    }
                    {
                        popoverState.progress?.map((progress: TaskProgress) => {
                            const progressPercent: number = progress.actual / progress.expected;
                            return (<IonList key={progress.taskID} >
                                <IonListHeader>{props.goalList.tasks[progress.taskID].name}</IonListHeader>

                                <IonProgressBar value={progressPercent} color={getColorSingle(popoverState.date!, popoverState.date!, progress)} />
                                <IonLabel >{progress.actual} / {progress.expected}</IonLabel>

                            </IonList>)
                        })
                    }

                </IonContent>
            </IonPopover>
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

                                const progress: Array<TaskProgress> = getDayTaskProgress(date, props.progressList, props.goalList);

                                return (<IonCol className="calendar-card" key={date.getTime()}>
                                    <IonButton
                                        color={getColorOverall(date, date, progress)}
                                        expand="block"
                                        size="small"
                                        className={
                                            date.getMonth() == props.currentMonth.getMonth() ? 'calendar-card' : 'calendar-card different-month'}
                                        onClick={(e) => {
                                            e.persist();
                                            setPopoverState({ showPopover: true, event: e, progress: progress, date: date })
                                        }}>

                                        {date.getDate()}
                                    </IonButton>
                                </IonCol>);
                            })
                        }
                    </IonRow>
                ))}

            </IonGrid>
        </>
    );
};

export default DailyCalendar;