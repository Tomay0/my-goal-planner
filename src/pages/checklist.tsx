import { IonPage } from '@ionic/react';
import React from 'react';
import { Goal, GoalList } from '../goal';
import { ProgressList } from '../progress';

class CheckList extends React.Component<{
    goalList: GoalList, progressList: ProgressList, updateProgress: (progressList: ProgressList) => void
}, { progressList: ProgressList }> {

    render() {
        return (
            <IonPage>
                <h1>TODO: Checklist</h1>
            </IonPage>
        );
    }
}

export default CheckList;