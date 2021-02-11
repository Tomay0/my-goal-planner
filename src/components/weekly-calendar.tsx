import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonGrid, IonIcon, IonLabel, IonList, IonListHeader, IonProgressBar, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { GoalList } from '../goal';
import { formatDate, getColorOverall, getColorSingle, getWeekTaskProgress, ProgressList, TaskProgress } from '../progress';
import { caretDownOutline, caretUpOutline } from 'ionicons/icons';

import '../theme/calendar.css';


const WeeklyCalendar: React.FC<{ currentMonth: Date, progressList: ProgressList, goalList: GoalList }> = props => {
    const [openedWeek, setOpenedWeek] = useState<Date>();
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

                const weekTaskProgress = getWeekTaskProgress(dateStart, props.progressList, props.goalList);

                const color = getColorOverall(dateStart, dateEnd, weekTaskProgress);

                return (
                    <IonRow key={dateStart.getTime()}>
                        <IonCol>
                            <IonCard>
                                <IonCardHeader>
                                    <IonToolbar>
                                        <IonButtons slot="secondary">
                                            <IonButton className="item" onClick={() => {
                                                if (openedWeek?.getTime() == dateStart.getTime()) {
                                                    setOpenedWeek(undefined);
                                                }
                                                else {
                                                    setOpenedWeek(dateStart);
                                                }
                                            }}>
                                                <IonIcon slot="icon-only" icon={openedWeek?.getTime() == dateStart.getTime() ? caretDownOutline : caretUpOutline} />
                                            </IonButton>
                                        </IonButtons>
                                        <IonTitle>{formatDate(dateStart)} to {formatDate(dateEnd)}</IonTitle>
                                    </IonToolbar>
                                    <IonProgressBar color={color} value={1.0} />

                                </IonCardHeader>
                                {openedWeek?.getTime() == dateStart.getTime() && (<IonCardContent>
                                    {
                                        weekTaskProgress.length == 0 && "No tasks are assigned for this week."
                                    }
                                    {
                                        weekTaskProgress.map((progress: TaskProgress) => {
                                            const progressPercent: number = progress.actual / progress.expected;
                                            return (<IonList key={progress.taskID} >
                                                <IonListHeader>{props.goalList.tasks[progress.taskID].name}</IonListHeader>

                                                <IonProgressBar value={progressPercent} color={getColorSingle(dateStart, dateEnd, progress)} />
                                                <IonLabel >{progress.actual} / {progress.expected}</IonLabel>

                                            </IonList>)
                                        })
                                    }
                                </IonCardContent>)}

                            </IonCard>
                        </IonCol>
                    </IonRow>
                );

            })}

        </IonGrid>
    );
};

export default WeeklyCalendar;