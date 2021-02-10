import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonGrid, IonItem, IonLabel, IonList, IonListHeader, IonProgressBar, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { GoalList, isGoalList } from '../goal';
import { formatDate, formatMonth, getColorOverall, getColorSingle, getMonthTaskProgress, ProgressList, TaskProgress } from '../progress';

import '../theme/calendar.css';


const MonthlyCalendar: React.FC<{ currentMonth: Date, progressList: ProgressList, goalList: GoalList }> = props => {
    const date = new Date(formatDate(props.currentMonth));
    date.setDate(1);

    const endDate = new Date(date);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(endDate.getDate() - 1);

    const monthTaskProgress = getMonthTaskProgress(date, props.progressList, props.goalList);

    

    const color = getColorOverall(date, endDate, monthTaskProgress);

    return (
        <IonGrid><IonRow><IonCol>
            <IonCard>
                <IonCardHeader>
                    <IonTitle>{formatMonth(date)}</IonTitle>
                    <IonProgressBar color={color} value={1.0} />
                </IonCardHeader>
                <IonCardContent>
                    {
                        monthTaskProgress.length == 0 && "No tasks are assigned for this week."
                    }
                    {
                        monthTaskProgress.map((progress: TaskProgress) => {
                            const progressPercent: number = progress.actual / progress.expected;
                            return (<IonList key={progress.taskID}>
                                <IonListHeader>{props.goalList.tasks[progress.taskID].name}</IonListHeader>

                                <IonProgressBar color={getColorSingle(date, endDate, progress)} value={progressPercent}></IonProgressBar>
                                <IonLabel>{progress.actual} / {progress.expected}</IonLabel>

                            </IonList>)
                        })
                    }

                </IonCardContent>
            </IonCard>
        </IonCol></IonRow></IonGrid>
    );
};

export default MonthlyCalendar;