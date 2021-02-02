import { IonCard, IonCardContent, IonCardHeader, IonInput, IonItem, IonLabel } from '@ionic/react';
import React from 'react';
import { Goal, isDurationTask, Task } from '../goal';
import { Progress } from '../progress';

/**
 * Pane containing an input for your dedication to a particular task
 * @param props goal object
 */
const CheckListPane: React.FC<{
    goal: Goal, task: Task, progress: Progress,
    updateProgress: (date: string, taskID: number, progressAmount: number) => void
}> = props => {
    return (
        <IonCard>
            <IonCardHeader>
                <h5>{props.goal.name} - {props.task.name}</h5>
            </IonCardHeader>
            <IonCardContent>
                <IonItem>
                    <IonLabel>
                        {isDurationTask(props.task) ? "Time Spent" : "Times Completed"}
                    </IonLabel>
                    <IonInput type="number" value={
                        props.task.id in props.progress.tasks ?
                            props.progress.tasks[props.task.id] :
                            0
                    } min="0" onIonChange={e =>
                        props.updateProgress(props.progress.date, props.task.id, +e.detail.value!)} />
                </IonItem>
            </IonCardContent>
        </IonCard >
    );
};

export default CheckListPane;