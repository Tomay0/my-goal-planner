import { IonButton, IonCard, IonHeader, IonIcon, IonLabel, IonPage } from '@ionic/react';
import React from 'react';
import { Goal, GoalList } from '../goal';
import { addOutline } from 'ionicons/icons';

const GoalPane: React.FC<{ goal: Goal }> = props => {
    return (
        <IonCard>
            <IonHeader>
                {props.goal.name}
            </IonHeader>
        </IonCard>
    );
}

const GoalCreator: React.FC = () => {

    return (
        <IonPage>

            <IonButton color="primary">
                <IonIcon icon={addOutline} slot='start' />
                <IonLabel>Add Goal</IonLabel>
            </IonButton>

        </IonPage>
    );
}

export default GoalCreator;