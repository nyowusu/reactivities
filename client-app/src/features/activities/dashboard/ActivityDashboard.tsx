import React from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface IProps {
  activities: IActivity[];
  selectedActivity: IActivity | undefined;
  cancelSelectActivity: () => void;
  handleSelectActivity: (id: string) => void;
  editMode: boolean;
  closeForm: () => void;
  openForm: (id: string) => void;
  createOrEdit: (activity: IActivity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export default function ActivityDashboard({
  activities,
  selectedActivity,
  handleSelectActivity,
  cancelSelectActivity,
  editMode,
  closeForm,
  openForm,
  createOrEdit,
  deleteActivity,
  submitting,
}: IProps) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
          handleSelectActivity={handleSelectActivity}
          deleteActivity={deleteActivity}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            selectedActivity={selectedActivity}
            closeForm={closeForm}
            createOrEdit={createOrEdit}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
