import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid } from "uuid";

import agent from "../api/agents";
import { IActivity } from "../models/activity";

export default class ActivityStore {
  activityRegistry = new Map<string, IActivity>();
  selectedActivity: IActivity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (actA, actB) => Date.parse(actA.date) - Date.parse(actB.date)
    );
  }

  loadActivities = async () => {
    try {
      const response = await agent.Activities.list();

      response.forEach((activity) => {
        this.activityRegistry.set(activity.id, {
          ...activity,
          date: activity.date.split("T")[0],
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
  };

  cancelSelectActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    if (id) this.selectActivity(id);

    if (!id) this.cancelSelectActivity();

    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  createActivity = async (activity: IActivity) => {
    this.setLoading(true);
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  updateActivity = async (activity: IActivity) => {
    this.setLoading(true);
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  deleteActivity = async (id: string) => {
    this.setLoading(true);
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        if (this.selectedActivity?.id === id) this.cancelSelectActivity();
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };
}
