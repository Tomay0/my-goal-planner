import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Goal, GoalList, Task } from '../goal';
import { ProgressList, Progress, formatMonth } from '../progress';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import DailyCalendar from '../components/daily-calendar';
import WeeklyCalendar from '../components/weekly-calendar';
import MonthlyCalendar from '../components/monthly-calendar';

class ProgressTracker extends React.Component<{
    goalList: GoalList, progressList: ProgressList
}, { period: string, currentMonth: Date }> {
    constructor(props: { goalList: GoalList, progressList: ProgressList }) {
        super(props);

        this.state = { period: "weekly", currentMonth: new Date() };

        this.selectPeriod = this.selectPeriod.bind(this);
        this.decreaseMonth = this.decreaseMonth.bind(this);
        this.increaseMonth = this.increaseMonth.bind(this);
    }

    selectPeriod(period: string) {
        this.setState({ period, currentMonth: this.state.currentMonth });
    }

    /**
     * Decrease date by 1 day
     */
    decreaseMonth() {
        const date = this.state.currentMonth;
        date.setMonth(date.getMonth() - 1);

        this.setState({ period: this.state.period, currentMonth: date });
    }

    /**
     * Increase date by 1 day
     */
    increaseMonth() {
        const date = this.state.currentMonth;
        date.setMonth(date.getMonth() + 1);

        this.setState({ period: this.state.period, currentMonth: date });
    }

    render() {
        return (
            <IonPage>
                <IonHeader>

                    <IonSegment onIonChange={e => { this.selectPeriod(e.detail.value!) }}
                        value={this.state.period}>
                        <IonSegmentButton value="daily">Daily</IonSegmentButton>
                        <IonSegmentButton value="weekly">Weekly</IonSegmentButton>
                        <IonSegmentButton value="monthly">Monthly</IonSegmentButton>
                    </IonSegment>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonButton fill="outline" onClick={this.decreaseMonth}>
                                <IonIcon icon={chevronBackOutline} />
                            </IonButton>
                        </IonButtons>
                        <IonButtons slot="primary">
                            <IonButton fill="outline" onClick={this.increaseMonth}>
                                <IonIcon icon={chevronForwardOutline} />
                            </IonButton>
                        </IonButtons>
                        <IonTitle className="ion-text-center">
                            {formatMonth(this.state.currentMonth)}
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {
                        this.state.period == 'daily' && <DailyCalendar currentMonth={this.state.currentMonth} 
                        goalList={this.props.goalList} progressList={this.props.progressList} />
                    }
                    {
                        this.state.period == 'weekly' && <WeeklyCalendar currentMonth={this.state.currentMonth} />
                    }
                    {
                        this.state.period == 'monthly' && <MonthlyCalendar currentMonth={this.state.currentMonth} />
                    }


                </IonContent>
            </IonPage>
        );
    }
}

export default ProgressTracker;