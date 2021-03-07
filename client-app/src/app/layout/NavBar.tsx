import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {
  const { activityStore } = useStore();

  function handleOpenForm() {
    activityStore.openForm();
  }

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: 10, paddingBottom: 5 }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button positive content="Create Activity" onClick={handleOpenForm} />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
