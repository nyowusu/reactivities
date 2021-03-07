import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  selectedActivity: IActivity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: IActivity) => void;
}

const defaultActivity: IActivity = {
  category: "",
  city: "",
  date: "",
  description: "",
  id: "",
  title: "",
  venue: "",
};

const formFieldNames = {
  category: "category",
  city: "city",
  date: "date",
  description: "description",
  id: "id",
  title: "title",
  venue: "venue",
};

export default function ActivityForm({
  selectedActivity = defaultActivity,
  closeForm,
  createOrEdit,
}: IProps) {
  const [activity, setActivity] = useState(selectedActivity);

  function handleSubmit() {
    createOrEdit(activity);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.currentTarget;

    const updateActivity = {
      ...activity,
      [name]: value,
    };

    setActivity(updateActivity);
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name={formFieldNames.title}
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name={formFieldNames.description}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name={formFieldNames.category}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Date"
          value={activity.date}
          name={formFieldNames.date}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name={formFieldNames.city}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name={formFieldNames.venue}
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={closeForm}
        />
      </Form>
    </Segment>
  );
}
