import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Goal, GoalList, Task } from '../goal';
import { ProgressList, Progress, formatDate } from '../progress';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import CheckListPane from '../components/checklist-pane';

class CheckList extends React.Component<{
    goalList: GoalList, progressList: ProgressList, updateProgress: (progressList: ProgressList) => void
}, { progressList: ProgressList, date: Date }> {
    /**
     * Create checklist object
     * @param props 
     */
    constructor(props: {
        goalList: GoalList, progressList: ProgressList, updateProgress: (progressList: ProgressList) => void
    }) {
        super(props);

        // init state with your list of progress and the current date 
        this.state = { progressList: props.progressList, date: new Date() };

        // bind functions
        this.decreaseDate = this.decreaseDate.bind(this);
        this.increaseDate = this.increaseDate.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
    }

    /**
     * Decrease date by 1 day
     */
    decreaseDate() {
        const date = this.state.date;
        date.setDate(date.getDate() - 1);

        this.setState({ progressList: this.state.progressList, date });
    }

    /**
     * Increase date by 1 day
     */
    increaseDate() {
        const date = this.state.date;
        date.setDate(date.getDate() + 1);

        this.setState({ progressList: this.state.progressList, date });
    }

    /**
     * Get progress object for the current date
     */
    getCurrentDayProgress() {
        const dateString = formatDate(this.state.date);

        if (!(dateString in this.state.progressList)) {
            return { date: dateString, tasks: {} };
        }

        return this.state.progressList[dateString];
    }

    /**
     * Update your progress on a given task for a day
     * @param date date you achieved the progress on
     * @param taskID ID of the task achieved
     * @param progressAmount progress on that task
     */
    updateProgress(date: string, taskID: number, progressAmount: number) {
        const progressList: ProgressList = this.state.progressList;

        if (!(date in progressList)) {
            progressList[date] = { date, tasks: {} };
        }
        const progress: Progress = progressList[date];
        progress.tasks[taskID] = progressAmount;

        this.props.updateProgress(progressList);
    }

    /**
     * Render
     */
    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonButton fill="outline" onClick={this.decreaseDate}>
                                <IonIcon icon={chevronBackOutline} />
                            </IonButton>
                        </IonButtons>
                        <IonButtons slot="primary">
                            <IonButton fill="outline" onClick={this.increaseDate}>
                                <IonIcon icon={chevronForwardOutline} />
                            </IonButton>
                        </IonButtons>
                        <IonTitle className="ion-text-center">
                            {formatDate(this.state.date)}
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {
                        this.props.goalList.goals.map((goal: Goal) =>
                            goal.tasks.map((task: Task) => (
                                <CheckListPane key={task.id} goal={goal} task={task}
                                    progress={this.getCurrentDayProgress()} updateProgress={this.updateProgress} />
                            ))
                        )
                    }
                </IonContent>
            </IonPage>
        );
    }
}

export default CheckList;