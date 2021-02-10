import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonIcon, IonInput, IonItem, IonLabel, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { CompletionTask, DurationTask, Task, isCompletionTask, isDurationTask } from '../goal';
import { closeOutline } from 'ionicons/icons';

/**
 * Panel which allows you to edit a task
 * @param props 
 */
const TaskPane: React.FC<{
    task: Task, removeTask: (task: Task) => void,
    replaceTask: (oldTask: Task, task: Task) => void,
    update: () => void
}> = props => {

    // update the name of the task
    function updateName(name: string) {
        props.task.name = name;

        props.update();
    }

    // change the task type
    function selectTaskType(type: string) {
        // singular completion type - note that daily is non selectable
        if (type === "completion") {
            const task: CompletionTask = {
                id: props.task.id,
                name: props.task.name,
                completionRate: props.task.completionRate,
                targetCount: 1,
                showDetails: true
            };

            props.replaceTask(props.task, task);
        }
        // 
        else {
            const task: DurationTask = {
                id: props.task.id,
                name: props.task.name,
                completionRate: props.task.completionRate,
                targetDuration: 60
            };

            props.replaceTask(props.task, task);
        }
    }

    // change the completion rate
    function selectTaskCompletionRate(completionRate: number) {
        props.task.completionRate = completionRate;

        props.update();
    }

    // change target amount
    function selectTargetAmount(targetAmount: number) {
        if (isCompletionTask(props.task)) {
            props.task.targetCount = targetAmount;
        }
        props.update();
    }

    // change target duration
    function selectTargetDuration(targetDuration: number) {
        if (isDurationTask(props.task)) {
            props.task.targetDuration = targetDuration;
        }
        props.update();
    }

    return (
        <IonCard>
            <IonCardHeader>
                <IonToolbar>
                    <IonButtons slot="secondary">
                        <IonButton className="item" onClick={() => { props.removeTask(props.task); }}>
                            <IonIcon slot="icon-only" icon={closeOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>
                        <IonInput value={props.task.name} placeholder="Enter name"
                            onIonChange={e => { updateName(e.detail.value!); }} />
                    </IonTitle>
                </IonToolbar>
            </IonCardHeader>
            <IonCardContent>
                <IonSegment onIonChange={e => { selectTaskType(e.detail.value!); }}
                    value={isCompletionTask(props.task) ? "completion" : "duration"}>
                    <IonSegmentButton value="duration">
                        Duration
                    </IonSegmentButton>
                    <IonSegmentButton value="completion">
                        Completion
                    </IonSegmentButton>
                </IonSegment>
                <IonSegment onIonChange={e => { selectTaskCompletionRate(+e.detail.value!); }}
                    value={props.task.completionRate + ""}>
                    <IonSegmentButton value="1">
                        Daily
                    </IonSegmentButton>
                    <IonSegmentButton value="2">
                        Weekly
                    </IonSegmentButton>
                    <IonSegmentButton value="3">
                        Monthly
                    </IonSegmentButton>
                </IonSegment>

                {
                    isCompletionTask(props.task) &&
                    <React.Fragment>
                        <IonItem>
                            <IonLabel>Target amount</IonLabel>
                            <IonInput type="number" value={props.task.targetCount} min="1" onIonChange={e => { selectTargetAmount(+e.detail.value!); }} />
                        </IonItem>
                    </React.Fragment>
                }
                {
                    isDurationTask(props.task) &&
                    <React.Fragment>
                        <IonItem>
                            <IonLabel>Target duration (mins)</IonLabel>
                            <IonInput type="number" value={props.task.targetDuration} min="1" onIonChange={e => { selectTargetDuration(+e.detail.value!); }} />
                        </IonItem>
                    </React.Fragment>
                }
            </IonCardContent>
        </IonCard>
    );
}

export default TaskPane;