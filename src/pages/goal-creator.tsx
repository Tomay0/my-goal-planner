import { IonPage } from '@ionic/react';
import React from 'react';

import GoalList from '../goal';

class GoalCreator extends React.Component<{ goals: GoalList }, { goals: GoalList }> {
    constructor(props: { goals: GoalList }) {
        super(props);

        this.setState({ goals: props.goals });
    }

    render() {
        return (
            <IonPage>
                <h1>TODO: Goal Creator</h1>
            </IonPage>
        );
    }
}

export default GoalCreator;